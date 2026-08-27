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

  /*document.querySelectorAll('.btn-drawer-acc').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentAcc = btn.closest('.drawer-acc-box');
      if (parentAcc) {
        parentAcc.classList.toggle('open');
      }
    });
  });*/
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
  
  // 약관 모달 제어
  const modalOpenBtns = document.querySelectorAll('.btn-terms-modal');
  const modals = document.querySelectorAll('.site-modal');

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

  modals.forEach(modal => {
    const btnClose = modal.querySelector('.btn-modal-close');
    const dim = modal.querySelector('.modal-dim');

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (dim) dim.addEventListener('click', closeModal);
  });
});