
/* ======================= CONFIG — EDIT ME ======================= */
const PASSCODE   = "021424";        // the code she types in
const HINT_TEXT  = "hint: 6 digit, 2024, if yk, yk";                 

const HER_NAME   = "cutie patootie beautiful princess baby";                 // optional, used in heading if set
const SIGNATURE  = "— always yours";   // sign-off line

// Paste an image URL, or the filename of an image you place in the SAME
// FOLDER as this html file (e.g. "bouquet.jpg"), to replace the dashed
// placeholder with a real photo. Leave "" to keep the placeholder.
const BOUQUET_IMG  = "smol.png";      // small card image
const PLUSH_IMG    = "3.png";        // small card image
const KEEPSAKE_IMG = "";

// Large images shown after clicking the cards
const BOUQUET_LIGHTBOX_IMG = "flowers.png";
const PLUSH_LIGHTBOX_IMG   = "4.png";   // optional extra photo shown inside the letter

// The small note that appears under each photo, and again when it's tapped.
const BOUQUET_NOTE = "kani lng sang amay";
const PLUSH_NOTE   = "kani rapud na amay";

// Separate notes shown inside the popup
const BOUQUET_LIGHTBOX_NOTE = "bogsh!, dako na flower bouquet hehe";
const PLUSH_LIGHTBOX_NOTE   = "biiiggggg cute yellow teddy bear hehe";

// Paste a song URL (or base64 data-URL of an mp3) to enable the music bar.
const MUSIC_SRC   = "Valentine .mp3";
const MUSIC_TITLE = "play me";

// Photos for the gallery section. Add as many as you want — each one is
// { src: "filename or URL", caption: "small note under it" }.
// Leave src as "" to keep a dashed placeholder tile for that slot.
const GALLERY_IMAGES = [
  { src: "h2.jpg", caption: "cute cute si baby" },
  { src: "h3.jpg", caption: "kaonnnn" },
  { src: "h4.jpg", caption: "naa nasad jollibee kaonn!!!" },
  { src: "h5.jpg", caption: "nag palit mi og gamit hehe" },
  { src: "h6.jpg", caption: "awww cutee si babbyyyy" },
  { src: "h7.jpg", caption: "nang laag mi hehehe" }
];

const LETTER_PARAGRAPHS = [
  "Happy Internation Girlfriend's Day BABE! I wanted to make you something special, just for you, to show how that how much i love you babe",
  "I dont want you to think that i dont love you or i dont show effort, so i created this little gift for you, to show how much i value you and how much i love you",
  "Thank you babe for bein there for me, my bestfriend, my tita, my princess, my wife, my everything.",
  "maunsa nlng ko kung wala ka, basin namatay na guro ko kay depress baya ko sauna hehe, pag abot nimo kay sunshine and rainbows na permi hehe",
  "like really baby thank you sa tanan, sa imong support saakong hobbies, gina push ko nimo mo na mogawas ko saakong comfort zone, and tanan tanan jud",
  "as my repayment, i will forever love you, support you, marry you, be patience for you, and TANAN! HEHEHE",
  "Happy Girlfriend's Day MY BABYYYYYYYY!"
];

const ambient = document.getElementById('ambient');
for(let i=0;i<16;i++){
  const m = document.createElement('div');
  m.className='mote';
  const s = 4 + Math.random()*8;
  m.style.width = s+'px'; m.style.height = s+'px';
  m.style.left = Math.random()*100+'vw';
  m.style.top = Math.random()*100+'vh';
  m.style.animationDuration = (6+Math.random()*8)+'s';
  m.style.animationDelay = (Math.random()*5)+'s';
  ambient.appendChild(m);
}


function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


const codeInput = document.getElementById('codeInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg  = document.getElementById('errorMsg');
const hintText  = document.getElementById('hintText');
if(HINT_TEXT) hintText.textContent = HINT_TEXT;

function tryUnlock(){
  const val = codeInput.value.trim().toLowerCase();
  if(val === PASSCODE.trim().toLowerCase()){
    showScreen('screen-gift');
  } else {
    codeInput.classList.remove('shake'); void codeInput.offsetWidth;
    codeInput.classList.add('shake');
    errorMsg.classList.add('show');
  }
}
unlockBtn.addEventListener('click', tryUnlock);
codeInput.addEventListener('keydown', e=>{ if(e.key==='Enter') tryUnlock(); });


const boxWrap = document.getElementById('boxWrap');
boxWrap.addEventListener('click', ()=>{
  if(boxWrap.classList.contains('opening')) return;
  boxWrap.classList.add('opening');
  setTimeout(()=> boxWrap.classList.add('leaving'), 550);
  setTimeout(()=> showScreen('screen-reveal'), 1000);
});


function setupPhotoSlot({imgId, placeholderId, captionId, note, presetUrl}){
  const img = document.getElementById(imgId);
  const placeholder = document.getElementById(placeholderId);
  document.getElementById(captionId).textContent = note;
  if(presetUrl){
    img.src = presetUrl;
    img.style.display='block';
    placeholder.style.display='none';
  }
}
setupPhotoSlot({imgId:'bouquetImg', placeholderId:'bouquetPlaceholder', captionId:'bouquetCaption', note:BOUQUET_NOTE, presetUrl:BOUQUET_IMG});
setupPhotoSlot({imgId:'plushImg', placeholderId:'plushPlaceholder', captionId:'plushCaption', note:PLUSH_NOTE, presetUrl:PLUSH_IMG});


const bouquetOverlay = document.getElementById('bouquetOverlay');
document.getElementById('bouquetLightboxNote').textContent = BOUQUET_LIGHTBOX_NOTE;
if(BOUQUET_LIGHTBOX_IMG || BOUQUET_IMG){
  document.getElementById('bouquetLightboxImg').src = BOUQUET_LIGHTBOX_IMG || BOUQUET_IMG;
  document.getElementById('bouquetLightboxImg').style.display='block';
  document.getElementById('bouquetLightboxPlaceholder').style.display='none';
}
document.getElementById('bouquetCard').addEventListener('click', ()=> bouquetOverlay.classList.add('active'));
document.getElementById('closeBouquetBtn').addEventListener('click', ()=> bouquetOverlay.classList.remove('active'));
bouquetOverlay.addEventListener('click', (e)=>{ if(e.target===bouquetOverlay) bouquetOverlay.classList.remove('active'); });


const plushOverlay = document.getElementById('plushOverlay');
document.getElementById('plushLightboxNote').textContent = PLUSH_LIGHTBOX_NOTE;
if(PLUSH_LIGHTBOX_IMG || PLUSH_IMG){
  document.getElementById('plushLightboxImg').src = PLUSH_LIGHTBOX_IMG || PLUSH_IMG;
  document.getElementById('plushLightboxImg').style.display='block';
  document.getElementById('plushLightboxPlaceholder').style.display='none';
}
document.getElementById('plushCard').addEventListener('click', ()=> plushOverlay.classList.add('active'));
document.getElementById('closePlushBtn').addEventListener('click', ()=> plushOverlay.classList.remove('active'));
plushOverlay.addEventListener('click', (e)=>{ if(e.target===plushOverlay) plushOverlay.classList.remove('active'); });


const musicBar = document.getElementById('musicBar');
const musicAudio = document.getElementById('musicAudio');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
document.getElementById('musicTitle').textContent = MUSIC_TITLE;

if(MUSIC_SRC){ musicAudio.src = MUSIC_SRC; }
setTimeout(()=> musicBar.classList.add('show'), 400);

musicToggle.addEventListener('click', ()=>{
  if(!MUSIC_SRC){
    document.getElementById('musicTitle').textContent = "add a song in the code ♪";
    setTimeout(()=> document.getElementById('musicTitle').textContent = MUSIC_TITLE, 2200);
    return;
  }
  if(musicAudio.paused){
    musicAudio.play().catch(()=>{});
    musicBar.classList.add('playing');
    playIcon.style.display='none'; pauseIcon.style.display='block';
  } else {
    musicAudio.pause();
    musicBar.classList.remove('playing');
    playIcon.style.display='block'; pauseIcon.style.display='none';
  }
});


const letterOverlay = document.getElementById('letterOverlay');
const letterBody = document.getElementById('letterBody');
const letterSign = document.getElementById('letterSign');
const letterDate = document.getElementById('letterDate');
const letterHeading = document.getElementById('letterHeading');

if(HER_NAME) letterHeading.textContent = `To My ${HER_NAME},`;
letterDate.textContent = new Date().toLocaleDateString(undefined,{year:'numeric', month:'long', day:'numeric'});
letterSign.textContent = SIGNATURE;

function buildLetter(){
  letterBody.innerHTML='';
  LETTER_PARAGRAPHS.forEach((txt,i)=>{
    const p=document.createElement('p');
    p.textContent = txt;
    p.style.animationDelay = (0.25 + i*0.35)+'s';
    letterBody.appendChild(p);
  });
  letterSign.style.animationDelay = (0.25 + LETTER_PARAGRAPHS.length*0.35)+'s';

  const photoWrap = document.getElementById('keepsakePhoto');
  const photoImg = document.getElementById('keepsakeImg');
  if(KEEPSAKE_IMG){
    photoImg.src = KEEPSAKE_IMG;
    photoWrap.style.display='block';
    photoWrap.style.animationDelay = (0.4 + LETTER_PARAGRAPHS.length*0.35)+'s';
  } else {
    photoWrap.style.display='none';
  }
}

document.getElementById('envelopeCard').addEventListener('click', ()=>{
  buildLetter();
  letterOverlay.classList.add('active');
});
document.getElementById('closeLetterBtn').addEventListener('click', ()=>{
  letterOverlay.classList.remove('active');
});
letterOverlay.addEventListener('click', (e)=>{
  if(e.target === letterOverlay) letterOverlay.classList.remove('active');
});


const galleryOverlay = document.getElementById('galleryOverlay');
const galleryGrid = document.getElementById('galleryGrid');
const galleryViewer = document.getElementById('galleryViewer');
const galleryViewerImg = document.getElementById('galleryViewerImg');
const galleryViewerCaption = document.getElementById('galleryViewerCaption');

function buildGallery(){
  galleryGrid.innerHTML = '';
  GALLERY_IMAGES.forEach((item, i)=>{
    const tile = document.createElement('div');
    tile.className = 'gallery-item';
    tile.style.animationDelay = (0.1 + i*0.08) + 's';

    if(item.src){
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption || 'gallery photo';
      tile.appendChild(img);
      tile.addEventListener('click', ()=>{
        galleryViewerImg.src = item.src;
        galleryViewerImg.alt = item.caption || 'gallery photo';
        galleryViewerCaption.textContent = item.caption || '';
        galleryViewer.classList.add('active');
      });
    } else {
      const ph = document.createElement('div');
      ph.className = 'gallery-placeholder';
      ph.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#DE9524" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M21 15l-5.5-5.5a1.5 1.5 0 0 0-2.1 0L4 19"/></svg><span>add a photo in GALLERY_IMAGES</span>';
      tile.appendChild(ph);
    }
    galleryGrid.appendChild(tile);
  });
}

document.getElementById('galleryCard').addEventListener('click', ()=>{
  buildGallery();
  galleryOverlay.classList.add('active');
});
document.getElementById('closeGalleryBtn').addEventListener('click', ()=>{
  galleryOverlay.classList.remove('active');
});
galleryOverlay.addEventListener('click', (e)=>{
  if(e.target === galleryOverlay) galleryOverlay.classList.remove('active');
});
galleryViewer.addEventListener('click', ()=>{
  galleryViewer.classList.remove('active');
});

// ---------- autoplay music on visit ----------
// Browsers block audio autoplay until the visitor has interacted with the
// page, so we try to play immediately, and if that's blocked, we start it
// on the very first tap/click/keypress anywhere on the page instead.
function tryAutoplayMusic(){
  if(!MUSIC_SRC) return;
  const playPromise = musicAudio.play();
  if(playPromise !== undefined){
    playPromise.then(()=>{
      musicBar.classList.add('playing');
      playIcon.style.display='none'; pauseIcon.style.display='block';
    }).catch(()=>{
      const startOnInteract = ()=>{
        musicAudio.play().then(()=>{
          musicBar.classList.add('playing');
          playIcon.style.display='none'; pauseIcon.style.display='block';
        }).catch(()=>{});
        document.removeEventListener('click', startOnInteract);
        document.removeEventListener('keydown', startOnInteract);
        document.removeEventListener('touchstart', startOnInteract);
      };
      document.addEventListener('click', startOnInteract, {once:true});
      document.addEventListener('keydown', startOnInteract, {once:true});
      document.addEventListener('touchstart', startOnInteract, {once:true});
    });
  }
}
tryAutoplayMusic();
