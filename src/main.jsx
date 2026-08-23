import React,{useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const MAX=10*1024*1024;
const TYPES=['image/jpeg','image/png','image/webp','application/pdf'];
function App(){
 const input=useRef(); const [file,setFile]=useState(null); const [error,setError]=useState(''); const [progress,setProgress]=useState(0); const [uploaded,setUploaded]=useState(null); const [drag,setDrag]=useState(false);
 const choose=f=>{setError('');setUploaded(null);if(!f)return;if(!TYPES.includes(f.type))return setError('Only JPG, PNG, WebP, and PDF files are supported.');if(f.size>MAX)return setError('File must be 10 MB or smaller.');setFile(f)};
 const upload=()=>{if(!file)return;setProgress(1);const xhr=new XMLHttpRequest();xhr.open('POST','/api/upload');xhr.upload.onprogress=e=>e.lengthComputable&&setProgress(Math.round(e.loaded/e.total*100));xhr.onload=()=>{try{const d=JSON.parse(xhr.responseText);if(xhr.status>=200&&xhr.status<300){setUploaded(d);setProgress(100)}else setError(d.error||'Upload failed')}catch{setError('Upload failed')}};xhr.onerror=()=>setError('Could not connect to the server.');const fd=new FormData();fd.append('file',file);xhr.send(fd)};
 return <main><section className="card"><div className="eyebrow">UPLOADFLOW</div><h1>Upload files without the friction.</h1><p className="sub">Drag a file here, preview it, validate it, and send it to your backend in one smooth flow.</p>
 <div className={'drop '+(drag?'drag':'')} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);choose(e.dataTransfer.files[0])}} onClick={()=>input.current.click()}><input ref={input} type="file" hidden accept="image/jpeg,image/png,image/webp,application/pdf" onChange={e=>choose(e.target.files[0])}/><div className="icon">↑</div><strong>Drop your file here</strong><span>or click to browse</span><small>JPG, PNG, WebP or PDF · max 10 MB</small></div>
 {error&&<div className="error">{error}</div>}
 {file&&<div className="preview">{file.type.startsWith('image/')?<img src={URL.createObjectURL(file)} alt="Preview"/>:<div className="pdf">PDF</div>}<div className="meta"><strong>{file.name}</strong><span>{(file.size/1024/1024).toFixed(2)} MB</span></div><button className="primary" onClick={e=>{e.stopPropagation();upload()}} disabled={progress>0&&progress<100}>{progress>0&&progress<100?'Uploading…':uploaded?'Uploaded':'Upload file'}</button></div>}
 {progress>0&&!uploaded&&<div className="progress"><div><span>Uploading</span><b>{progress}%</b></div><div className="bar"><i style={{width:`${progress}%`}}/></div></div>}
 {uploaded&&<div className="success"><span>✓</span><div><strong>Upload complete</strong><a href={uploaded.url} target="_blank" rel="noreferrer">View or download {uploaded.originalName}</a></div></div>}
 </section></main>}
createRoot(document.getElementById('root')).render(<App/>);
