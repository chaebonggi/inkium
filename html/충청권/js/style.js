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
    // 클릭된 요소가 .btn-drawer-acc 이거나 그 자식(아이콘, 텍스트 등)인지 확인
    const btn = e.target.closest('.btn-drawer-acc');
    
    if (btn) {
      const parentAcc = btn.closest('.drawer-acc-box');
      if (parentAcc) {
        parentAcc.classList.toggle('open');
      }
    }
  });
  
  // 모바일 드로어 아코디언 메뉴
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-drawer-acc');
    if (btn) {
      const parentAcc = btn.closest('.drawer-acc-box');
      if (parentAcc) {
        parentAcc.classList.toggle('open');
      }
    }
  });
  
  // 1. 공통 모달 열기 제어
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

  // 2. 공통 모달 닫기 제어 (모든 닫기 버튼/취소 버튼 및 Dim 클릭 완벽 대응)
  document.addEventListener('click', (e) => {
    // 닫기 버튼(.btn-modal-close) 클릭 시
    const closeBtn = e.target.closest('.btn-modal-close');
    if (closeBtn) {
      const parentModal = closeBtn.closest('.site-modal');
      if (parentModal) {
        parentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      return;
    }

    // 모달 배경(Dim) 클릭 시
    if (e.target.classList.contains('modal-dim')) {
      const parentModal = e.target.closest('.site-modal');
      if (parentModal) {
        parentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // 3. 임시 공유하기 URL 자동 세팅
  const shareInput = document.getElementById('shareCurrentUrl');
  if (shareInput) shareInput.value = window.location.href;

  // 4. 임시 입사지원 단계 전환 스크립트
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
      const checkedRadio = modalApply.querySelector('input[name="selectResume"]:checked');
      if (checkedRadio) {
        const cardTitle = checkedRadio.closest('.resume-select-card')?.querySelector('.r-title')?.textContent;
        if (confirmResumeName) confirmResumeName.textContent = cardTitle || '파일 첨부 이력서';
      }
      step1.classList.remove('active');
      step2.classList.add('active');
    });

    // Step 2 -> Step 1
    btnPrev?.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
    });

    // Step 2 동의 체크 시 최종 제출 버튼 활성화
    chkAgree?.addEventListener('change', (e) => {
      if (btnSubmit) btnSubmit.disabled = !e.target.checked;
    });

    // Step 2 -> Step 3 (완료)
    btnSubmit?.addEventListener('click', () => {
      step2.classList.remove('active');
      step3.classList.add('active');
    });

    // 파일 첨부 시 파일명 출력
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