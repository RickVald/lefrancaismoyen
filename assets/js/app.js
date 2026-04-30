async function loadData(){
  const res = await fetch('data/dashboard-series.json');
  return await res.json();
}
function metricCard(m){return `<article class="metric"><span>${m.label}</span><strong>${m.value}</strong><small>${m.note}</small></article>`}
function drawChart(el, points){
  const w=520,h=220,p=28;
  const xs=points.map(d=>d[0]), ys=points.map(d=>d[1]);
  const minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys)*.95, maxY=Math.max(...ys)*1.05;
  const x=v=>p+(v-minX)/(maxX-minX)*(w-p*2); const y=v=>h-p-(v-minY)/(maxY-minY)*(h-p*2);
  const path=points.map((d,i)=>(i?'L':'M')+x(d[0]).toFixed(1)+' '+y(d[1]).toFixed(1)).join(' ');
  const last=points[points.length-1];
  el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Courbe d'indice"><path d="M${p} ${h-p}H${w-p}" stroke="#334155"/><path d="M${p} ${p}V${h-p}" stroke="#334155"/><path d="${path}" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/><circle cx="${x(last[0])}" cy="${y(last[1])}" r="6" fill="#f59e0b"/><text x="${p}" y="${p}" fill="#94a3b8" font-size="13">${points[0][0]}</text><text x="${w-p-42}" y="${p}" fill="#94a3b8" font-size="13">${last[0]}</text><text x="${x(last[0])-24}" y="${y(last[1])-14}" fill="#f8fafc" font-size="14" font-weight="700">${last[1]}</text></svg>`;
}
loadData().then(data=>{
  document.getElementById('snapshotCards').innerHTML=data.snapshot.map(metricCard).join('');
  document.getElementById('realityChecks').innerHTML=data.realityChecks.map(x=>`<article class="compare-item"><b>${x.feeling}</b><p>${x.reality}</p></article>`).join('');
  document.querySelectorAll('[data-chart]').forEach(el=>drawChart(el,data.charts[el.dataset.chart]));
}).catch(()=>{document.body.classList.add('data-error')});
