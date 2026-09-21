document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const btnOpen = document.getElementById('btnDrawerOpen');
  const btnClose = document.getElementById('btnDrawerClose');
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('drawerMenu');

  function openDrawer() {
    if (overlay && drawer) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (overlay && drawer) {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (btnOpen) btnOpen.addEventListener('click', openDrawer);
  if (btnClose) btnClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('click', (e) => {
    // �대┃�� �붿냼媛� .btn-drawer-acc �닿굅�� 洹� �먯떇(�꾩씠肄�, �띿뒪�� ��)�몄� �뺤씤
    const btn = e.target.closest('.btn-drawer-acc');
    
    if (btn) {
      const parentAcc = btn.closest('.drawer-acc-box');
      if (parentAcc) {
        parentAcc.classList.toggle('open');
      }
    }
  });
  
  // 紐⑤컮�� �쒕줈�� �꾩퐫�붿뼵 硫붾돱
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-drawer-acc');
    if (btn) {
      const parentAcc = btn.closest('.drawer-acc-box');
      if (parentAcc) {
        parentAcc.classList.toggle('open');
      }
    }
  });
  
  // 1. 怨듯넻 紐⑤떖 �닿린 �쒖뼱
  const modalOpenBtns = document.querySelectorAll('.btn-terms-modal');
  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 2. 怨듯넻 紐⑤떖 �リ린 �쒖뼱 (紐⑤뱺 �リ린 踰꾪듉/痍⑥냼 踰꾪듉 諛� Dim �대┃ �꾨꼍 ����)
  document.addEventListener('click', (e) => {
    // �リ린 踰꾪듉(.btn-modal-close) �대┃ ��
    const closeBtn = e.target.closest('.btn-modal-close');
    if (closeBtn) {
      const parentModal = closeBtn.closest('.site-modal');
      if (parentModal) {
        parentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      return;
    }

    // 紐⑤떖 諛곌꼍(Dim) �대┃ ��
    if (e.target.classList.contains('modal-dim')) {
      const parentModal = e.target.closest('.site-modal');
      if (parentModal) {
        parentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // 3. �꾩떆 怨듭쑀�섍린 URL �먮룞 �명똿
  /*const shareInput = document.getElementById('shareCurrentUrl');
  if (shareInput) shareInput.value = window.location.href;*/

  // 4. �꾩떆 �낆궗吏��� �④퀎 �꾪솚 �ㅽ겕由쏀듃
  const modalApply = document.getElementById('modalApply');
  if (modalApply) {
    const step1 = modalApply.querySelector('.step-1');
    const step2 = modalApply.querySelector('.step-2');
    const step3 = modalApply.querySelector('.step-3');

    const btnNext = modalApply.querySelector('.btn-step-next');
    const btnPrev = modalApply.querySelector('.btn-step-prev');
    const btnSubmit = modalApply.querySelector('.btn-step-submit');
    const chkAgree = document.getElementById('chkApplyAgree');
    const confirmResumeName = document.getElementById('confirmResumeName');

    // Step 1 -> Step 2
    btnNext?.addEventListener('click', () => {
      const checkedRadio = modalApply.querySelector('input[name="resumeSeqChk"]:checked');
      if (checkedRadio) {
        const cardTitle = checkedRadio.closest('.resume-select-card')?.querySelector('.r-title')?.textContent;
        if (confirmResumeName) confirmResumeName.textContent = cardTitle || '�뚯씪 泥⑤� �대젰��';
      }
      step1.classList.remove('active');
      step2.classList.add('active');
    });

    // Step 2 -> Step 1
    btnPrev?.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
    });

    // Step 2 �숈쓽 泥댄겕 �� 理쒖쥌 �쒖텧 踰꾪듉 �쒖꽦��
    chkAgree?.addEventListener('change', (e) => {
      if (btnSubmit) btnSubmit.disabled = !e.target.checked;
    });

    // Step 2 -> Step 3 (�꾨즺)
    /*btnSubmit?.addEventListener('click', () => {
      step2.classList.remove('active');
      step3.classList.add('active');
    });*/

    // �뚯씪 泥⑤� �� �뚯씪紐� 異쒕젰
    const fileInput = document.getElementById('attachFileInput');
    const fileNamePreview = document.getElementById('fileNamePreview');
    const radioCustomFile = document.getElementById('radioCustomFile');

    fileInput?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        if (fileNamePreview) fileNamePreview.value = e.target.files[0].name;
        if (radioCustomFile) radioCustomFile.checked = true;
      }
    });
  }
});

// �ъ쟾 李몄꽍�좎껌 紐⑤떖 �닿린
const btnOpenPreApply = document.getElementById('btnOpenPreApply');
const modalPreApply = document.getElementById('modalPreApply');
btnOpenPreApply?.addEventListener('click', () => {
  modalPreApply?.classList.add('active');
});

const btnSubmitPreApply = document.getElementById('btnSubmitPreApply');
btnSubmitPreApply?.addEventListener('click', () => {
  modalPreApply?.classList.remove('active');
  document.body.style.overflow = '';
  if (typeof showToast === 'function') {
    showToast('�ъ쟾 李몄꽍�좎껌�� �꾨즺�섏뿀�듬땲��.', 'success');
  } else {
    alert('�ъ쟾 李몄꽍�좎껌�� �꾨즺�섏뿀�듬땲��.');
  }
});