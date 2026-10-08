/*
===================================================================
	Function : getCookie(), setCookie()

===================================================================
*/
	function getCookie(name) {
	  var dc = document.cookie;
	  var prefix = name + "=";
	  var begin = dc.indexOf("; " + prefix);
	  if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	  } else {
		begin += 2;
	  }
	  var end = document.cookie.indexOf(";", begin);
	  if (end == -1){
		end = dc.length;
	  }
	  return unescape(dc.substring(begin + prefix.length, end));
	}
	
	function setCookie(nm, val, maxAge){
		var cok = nm+"="+escape(val);
		if(maxAge) {
			var dt = new Date();
			dt.setTime(dt.getTime()+maxAge);
			cok += "; expires="+dt.toGMTString();
		}
		
		document.cookie = (cok+";");
	}
	
	function deleteCookie(name) {
	  if (getCookie(name)) {
		document.cookie = name + "=" +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	  }
	}
	

	function datePickerSetCom(){
		//date
		$(".datep").datepicker({
	
			showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
			buttonImage: "/images/jobcloud/calendar_ico.png",
	
			changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.

			changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.

			minDate: '-100y', // 현재날짜로부터 100년이전까지 년을 표시한다.

			nextText: '다음 달', // next 아이콘의 툴팁.

			prevText: '이전 달', // prev 아이콘의 툴팁.

			numberOfMonths: [1, 1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.

			stepMonths: 1, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가. 

			yearRange: 'c-50:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.

			showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다. 

			currentText: '오늘 날짜', // 오늘 날짜로 이동하는 버튼 패널

			closeText: '닫기', // 닫기 버튼 패널

			dateFormat: "yy.mm.dd", // 텍스트 필드에 입력되는 날짜 형식.

			showMonthAfterYear: true, // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다. 
			
			firstDate : 0,

			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 요일의 한글 형식.

			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], // 월의 한글 형식.
	
	
		});
	
	}
	
	
	
	function onLoading() {
		$('.loading').show();
	}
	
	
	function offLoading() {
		$('.loading').hide();
	}
	
	// ajax에러 공통 적용. 기존 ajax error 발생 시 콘솔로그만 찍는 경우가 있어 전체적으로 alert띄우도록 처리. 필요 시 주석해제 20260714
	/* 
	$(document).ajaxError(function(event, xhr, settings, thrownError) {
		if (xhr.status === 400) {
			try {
				var res = JSON.parse(xhr.responseText);
				if (res.message) {
					alert(res.message);
					return;
				}
			} catch(e) {}
		}
		if (xhr.status === 500) {
			alert("처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
		}
	});
	*/
// isMask 파라미터에 true를 넘기면 가운데 자리(대표번호는 뒷자리)가 *로 마스킹 처리됩니다.

/**
 * 전화번호 문자열에 규격에 맞게 하이픈(-)을 추가합니다.
 * @param {string} value - 숫자 또는 하이픈이 포함된 입력값
 * @returns {string} 포맷팅된 전화번호
 */
function formatPhoneNumber(value) {
  if (!value) return '';

  // 숫자만 추출
  const cleanNum = value.replace(/[^0-9]/g, '');

  // 1. 대표번호 (8자리: 1588, 1577 등)
  if (/^1[5-8]\d{6}$/.test(cleanNum)) {
    return cleanNum.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  // 2. 서울 지역번호 (02 시작: 총 9자리 또는 10자리)
  if (cleanNum.startsWith('02')) {
    if (cleanNum.length === 9) {
      return cleanNum.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return cleanNum.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  // 3. 일반 지역번호(031 등) 및 휴대전화(010 등) (총 10자리 또는 11자리)
  if (cleanNum.length === 10) {
    return cleanNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  if (cleanNum.length === 11) {
    return cleanNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  // 매칭되지 않는 자릿수는 원본 반환
  return cleanNum;
}

/**
 * 공통 모달 열기 함수
 * @param {string} modalId - 열고자 하는 모달의 HTML ID
 */
function openModal(modalId) {
    if (!modalId) return;
    
    var modalEl = document.getElementById(modalId);
    if (modalEl) {
        modalEl.classList.add("active");
        // main.js의 동작과 맞추어 모달 오픈 시 배경 스크롤을 방지합니다.
        document.body.style.overflow = "hidden";
    }
}

/**
 * 공통 모달 닫기 함수
 * @param {string} modalId - 닫고자 하는 모달의 HTML ID
 */
function closeModal(modalId) {
    if (!modalId) return;
    
    var modalEl = document.getElementById(modalId);
    if (modalEl) {
        modalEl.classList.remove("active");
        // 모달 닫기 시 배경 스크롤을 복구합니다.
        document.body.style.overflow = "";
    }
}

/***********************************
 중복로그인시 SessionExpiredInterceptor.java 인터셉터에서 
 ajax호출 시 헤더에 중복파라미터 리턴해줌.
 이에따라 ajax 통신오류가 아닌 중복로그인 alert이후 로그인 페이지로 이동시킴.
***********************************/
var SESSION_STORAGE_KEY = "GLOBAL_SESSION_EXPIRED_TIMESTAMP";

// 1. 다른 창에서 세션 만료가 감지되었을 때 실시간 수신 리스너
window.addEventListener("storage", function(e) {
    if (e.key === SESSION_STORAGE_KEY && e.newValue) {
        // 이미 다른 창에서 alert를 띄웠으므로, 이 창은 alert 없이 조용히 처리
        if (window.opener && !window.opener.closed) {
            window.close(); // 팝업이면 조용히 닫기
        } else {
            // 본창(메인 창)이면 로그인 페이지로 즉시 이동 (기존 파라미터 유지)
            window.location.href = e.newValue;
        }
    }
});

function handleSessionRedirect(redirectUrl, message) {
    // 이미 다른 창 또는 현재 창에서 처리 중인지 체크
    var lastTriggered = localStorage.getItem(SESSION_STORAGE_KEY);
    var now = new Date().getTime();

    // 5초 이내에 이미 다른 창에서 신호를 보냈다면 현재 창은 alert 띄우지 않고 닫기만 함
    if (lastTriggered && (now - parseInt(lastTriggered.split("|")[0], 10) < 5000)) {
        if (window.opener && !window.opener.closed) {
            window.close();
        }
        return;
    }

    // 다른 모든 창(부모창, 다른 팝업들)에 "세션 만료됨! alert 띄우지 말고 닫아라" 신호 전송
    try {
        localStorage.setItem(SESSION_STORAGE_KEY, now + "|" + redirectUrl);
    } catch (e) {}

    // 1. 단 딱 1번만 메시지 출력
    if (message) {
        alert(message);
    }

    try {
        // 2. 다단계 팝업 체인 거슬러 올라가기
        if (window.opener && !window.opener.closed) {
            var rootOpener = window.opener;
            var popupsToClose = [];

            while (rootOpener.opener && !rootOpener.opener.closed) {
                try {
                    popupsToClose.push(rootOpener);
                    rootOpener = rootOpener.opener;
                } catch (e) {
                    break;
                }
            }

            // 최상위 메인 창 이동
            if (rootOpener && !rootOpener.closed) {
                try {
                    rootOpener.top.location.href = redirectUrl;

                    // 중간 서브 팝업들 전부 닫기
                    for (var i = 0; i < popupsToClose.length; i++) {
                        try { popupsToClose[i].close(); } catch (e) {}
                    }

                    // 현재 팝업 닫기
                    window.close();
                    return;
                } catch (e) {}
            }
        }

        // 3. iframe
        if (window.top && window.top !== window) {
            window.top.location.href = redirectUrl;
            return;
        }
    } catch (e) {}

    // 4. 일반 메인 페이지 이동
    window.location.href = redirectUrl;
}

/*********************************************************************
 * ajax 전역 리스너
 *********************************************************************/
$(document).ajaxComplete(function(event, xhr, settings) {
    var sessionExpired = xhr.getResponseHeader("session-expired");
    if (xhr.status === 401 && sessionExpired) {
        if (sessionExpired === "duplicate") {
            handleSessionRedirect("/com/login/login.do?expired=true", "다른 기기(브라우저)에서 로그인하여 접속이 종료되었습니다.");
        } else if (sessionExpired === "true") {
            handleSessionRedirect("/com/login/login.do?auth_error=4", "세션이 만료되었습니다. 다시 로그인해 주세요.");
        }
    }
});

/*********************************************************************
 * 일반/AJAX 동적 테이블 모두 지원하는 체크박스 전체선택 자동 감지
 *********************************************************************/
document.addEventListener('change', function(event) {
    // 1. 클릭된 요소가 '전체 선택(thead)' 체크박스인 경우
    if (event.target.matches('table thead input[type="checkbox"]')) {
        const table = event.target.closest('table');
        const itemCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
        
        itemCheckboxes.forEach(cb => {
            cb.checked = event.target.checked;
        });
    }
    
    // 2. 클릭된 요소가 '개별 선택(tbody)' 체크박스인 경우
    if (event.target.matches('table tbody input[type="checkbox"]')) {
        const table = event.target.closest('table');
        const masterCheckbox = table.querySelector('thead input[type="checkbox"]');
        
        if (masterCheckbox) {
            const itemCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
            const checkedCount = table.querySelectorAll('tbody input[type="checkbox"]:checked').length;
            const totalCount = itemCheckboxes.length;
            
            // 하나라도 풀리면 해제, 모두 체크되면 체크
            masterCheckbox.checked = (totalCount === checkedCount) && (totalCount > 0);
        }
    }
});