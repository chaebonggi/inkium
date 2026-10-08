$(document).ready(function () {
    $(".all").on("click", function () {
        $("#mobile-nav").addClass("is-open");
        $("html").css('overflow', 'hidden')
    });
    $("#close-nav").on("click", function () {
        $("#mobile-nav").removeClass("active");
        $("html").css('overflow', 'revert-layer')
    });

    const $btnGnb = $("#jc-header .header-top .btn-gnb");
    function toggleMenuState() {
        $("#jc-header").toggleClass("header-small")
        $("#container").toggleClass("container-small");
        $("#jc-footer").toggleClass("footer-small");
        $btnGnb.toggleClass("open");
    }
    $btnGnb.on("click", toggleMenuState);
    $(".gnb-list").on("click", "li .btn-op", function () {
        $(this).parent().addClass("active").siblings().removeClass("active");
    });

    function removeClassesOnResize() {
        if ($(window).width() <= 1024) {
            $("#jc-header").removeClass("header-small");
            $("#container").removeClass("container-small");
            $("#jc-footer").removeClass("footer-small");
            $btnGnb.removeClass("open");
        }
    }

    $(window).on("resize", removeClassesOnResize);
    removeClassesOnResize();

    // 토글 버튼
    /*$(".toggle-btn").on("click", function () {
        $(this).toggleClass("active");
    });*/
    //필터 버튼
    /*$('.filter-btn').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.items-group').find('.filter-item').slideToggle();
    });*/

    $(".sort-cancel-btn").on("click", function () {
        let $wrap = $(this).closest(".sort-options");
        let $btn = $wrap.siblings(".sort-add-btn");
        $btn.removeClass("active");
        $wrap.slideUp();
    });

    // 테이블 상세 버튼
    $('.switch-group input[type="radio"]').change(function () {
        var $tableGroup = $(this).closest('.table-group');
        var $table = $tableGroup.find('.krds-table-wrap.tbl-type table');
        if ($tableGroup.find('#radio-one').is(':checked')) {
            $table.find('.detail').hide();
            $table.find('.simple').show();
        } else {
            $table.find('.detail').show();
            $table.find('.simple').hide();
        }
    });
    // tree 메뉴
    /*var options = {
        placeholderCss: {
            'background-color': '#eee'
        },
        hintCss: {
            'background-color': '#ddd'
        },
        ignoreClass: 'clickable',
    };    */
    /*$('#sTree2').sortableLists(options);
    $('.sTree .tree-btn').click(function () {
        $(this).parent().parent().parent().parent().toggleClass('s-l-open');
        if ($(this).parent().parent().parent().parent().hasClass("s-l-open")) {
            $(this).parent().parent().parent().parent().children('ul').show();
        } else if (!$(this).parent().parent().parent().parent().hasClass("s-l-open")) {
            $(this).parent().parent().parent().parent().children('ul').hide();
        }
    });*/
       $('.all-view').click(function () {
       $('.sTree > li  ul').show();
       $('.sTree  li').addClass('s-l-open');
    });
    $('.all-fold').click(function () {
        $('.sTree > li  ul').hide();
        $('.sTree  li').removeClass('s-l-open');
    });

    // radio target toggle
    $('input[type="radio"]').on('change', function () {
        let $container = $(this).closest('.item');
        let $target = $container.find('.radio-target-item');

        if ($container.find('.radio-target').is(':checked')) {
          $target.slideDown();
        } else {
          $target.slideUp();
        }
      });
    // 사이드 메뉴
    $(".side-open-btn").on("click", function () {
        $(".side-menu").addClass("is-open");
    });
    $(".side-close-btn").on("click", function () {
        $(".side-menu").removeClass("is-open");
    });

    // 탭메뉴
    $(".tabs li a").click(function () {
        $(this).parent().siblings("li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parent().parent().parent().parent().find(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
    });

    // 드랍 토글 메뉴
    $(".drop-menu").on("click", function () {
        const target = $(this).data("target");
        const $targetDropdown = $(`.drop-cont[data-target="${target}"]`);
        $targetDropdown.slideToggle(300);
    });
    // 드랍 메뉴2
    $(".dropdown-btn").on("click", function (event) {
        event.stopPropagation();
        const target = $(this).data("target");
        const targetDropdown = $(`.dropdown-cont[data-target="${target}"]`);
        $(".dropdown-cont").not(targetDropdown).removeClass("show");
        targetDropdown.toggleClass("show");
      });
    $(document).on("click", function () {
        $(".dropdown-cont").removeClass("show");
    });
    
    
});

//전체 선택 해제 
function allSearch(input) {
	var inputName = $("input:checkbox[name='"+input+"']");
	inputName[0].checked = true;
	for (var i = 1; i < inputName.length; i++) {
		inputName[i].checked = false;
	}
}

function releaseSearch(input) {
	var inputName = $("input:checkbox[name='"+input+"']");
	inputName[0].checked = false;
	var all_check = true;
	for(i = 1; i < inputName.length; i++) {
		if (inputName[i].checked) {
			all_check = false;
			break;
		}
	}
	if (all_check) {
		inputName[0].checked = true;
	}
}


//달력 krds
$(function () {
    // 이전 달 버튼
    $(".btn-cal-move.prev").on("click", function () {
        let { year, month } = getYearMonth();
        month--;
        if (month < 1) {
            month = 12;
            year--;
        }
        renderCalendar(year, month);
    });

    // 다음 달 버튼
    $(".btn-cal-move.next").on("click", function () {
        let { year, month } = getYearMonth();
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
        renderCalendar(year, month);
    });

    // 연도 선택 이벤트
    $(".calendar-year-wrap button").on("click", function () {
        let selectedYear = parseInt($(this).text());
        let { month } = getYearMonth();
        renderCalendar(selectedYear, month);
    });

    // 월 선택 이벤트
    $(".calendar-mon-wrap button").on("click", function () {
        let selectedMonth = parseInt($(this).text());
        let { year } = getYearMonth();
        renderCalendar(year, selectedMonth);
    });

    // 오늘 버튼
    $("#get-today").on("click", function () {
        const today = new Date();
        renderCalendar(today.getFullYear(), today.getMonth() + 1);
    });
    
     // 초기 셋업
    const now = new Date();
    renderYearButtons(2010, 2050);
    renderMonthButtons();
    renderCalendar(now.getFullYear(), now.getMonth() + 1);
    
    const krds_calendar = {
  datePickerArea: null,
  activeDateSelector: null,
	  init() {
	    this.datePickerArea = document.querySelectorAll(".krds-calendar-area");
	
	    if (!this.datePickerArea.length) return;
	
	    this.setupDatePicker();
	    this.setupGlobalListeners();
	    this.setupOpenCloseEvents();
	    this.setupDateComboBox("init");
	    this.toggleDateSelector();
	    this.actionDatePicker();
	
	    // ui 동작 확인용 테스트 코드
	    this.example();
	  },
	  setupDatePicker() {
	    this.datePickerArea.forEach((datePicker) => {
	      datePicker.querySelector(".calendar-wrap").setAttribute("tabindex", "0");
	
	      // 접근성 초기값 설정
	      datePicker.querySelectorAll(".calendar-tbl td").forEach((cell) => {
	        const dateButton = cell.querySelector(".btn-set-date");
	        if (!dateButton) return;
	        if (cell.classList.contains("period")) {
	          dateButton.setAttribute("aria-pressed", "true");
	        }
	        if (cell.classList.contains("day-event")) {
	          dateButton.setAttribute("aria-label", `${dateButton.innerText} 일정있음`);
	        }
	        if (cell.classList.contains("today")) {
	          dateButton.setAttribute("aria-label", `${dateButton.innerText} 오늘`);
	        }
	      });
	    });
	  },
	  setupGlobalListeners() {
	    document.addEventListener("click", (event) => {
	      if (!event.target.closest(".calendar-conts")) {
	        this.closeAllDatePickers();
	      }
	    });
	  },
	  setupOpenCloseEvents() {
	    const datePickerButtons = document.querySelectorAll(".form-btn-datepicker");
	    datePickerButtons.forEach((button) => {
	      button.addEventListener("click", () => this.openDatePicker(button));
	    });
	
	    // 탭 이동 닫기
	    this.datePickerArea.forEach((datePicker) => {
	      // 마지막 버튼이 blur될 때 datepicker 닫기(포커스 트랩을 사용하지 않을때 적용)
	      // const lastActionButton = datePicker.querySelector(".calendar-btn-wrap .krds-btn:last-child");
	      // if (lastActionButton) {
	      //   lastActionButton.addEventListener("blur", () => this.closeAllDatePickers());
	      // }
	
	      // calendar-select의 마지막 버튼이 blur될 때 선택기 닫기
	      datePicker.querySelectorAll(".calendar-select").forEach((select) => {
	        const lastSelectButton = select.querySelector(".sel > li:last-child > button");
	        if (lastSelectButton) {
	          lastSelectButton.addEventListener("blur", () => {
	            this.resetDateSelector();
	          });
	        }
	      });
	    });
	  },
	  openDatePicker(button) {
	    // 열려있던 달력 모두 닫기
	    this.closeAllDatePickers();
	
	    const currentDatePicker = button.closest(".calendar-conts").querySelector(".krds-calendar-area");
	    currentDatePicker.classList.add("active");
	
	    // 접근성
	    button.setAttribute("aria-expanded", "true");
	
	    // 포커스 트랩 설정
	    common.focusTrap(currentDatePicker);
	
	    // 포커스 이동
	    setTimeout(() => {
	      currentDatePicker.querySelector(".calendar-wrap").focus();
	    }, 50);
	  },
	  resetDateSelector() {
	    this.datePickerArea.forEach((datePicker) => {
	      const selectMenus = datePicker.querySelectorAll(".calendar-select");
	      selectMenus.forEach((select) => select.classList.remove("active"));
	      this.setupDateComboBox("reset");
	      this.activeDateSelector = null;
	    });
	  },
	  closeAllDatePickers() {
	    this.datePickerArea.forEach((datePicker) => {
	      if (datePicker.classList.contains("active")) {
	        const target = datePicker.closest(".calendar-conts").querySelector(".form-btn-datepicker");
	        target.focus();
	      }
	      datePicker.classList.remove("active");
	      this.resetDateSelector();
	    });
	
	    // 접근성
	    const datePickerButtons = document.querySelectorAll(".form-btn-datepicker");
	    datePickerButtons.forEach((button) => {
	      button.setAttribute("aria-expanded", "false");
	    });
	  },
	  setupDateComboBox(option, target) {
	    const comboBoxs = document.querySelectorAll(".calendar-drop-down > button");
	    if (option === "init") {
	      comboBoxs.forEach((comboBox, idx) => {
	        const listBox = comboBox.nextElementSibling.querySelector(".sel");
	        const listOptions = listBox.querySelectorAll("button");
	        const uniqueIdx = `${idx}${Math.random().toString(36).substring(2, 9)}`;
	
	        comboBox.setAttribute("role", "combobox");
	        comboBox.setAttribute("aria-haspopup", "listbox");
	        comboBox.setAttribute("aria-expanded", "false");
	        comboBox.setAttribute("aria-controls", `combo-list-${uniqueIdx}`);
	
	        listBox.setAttribute("role", "listbox");
	        listBox.setAttribute("id", `combo-list-${uniqueIdx}`);
	        listBox.querySelectorAll("li").forEach((li) => li.setAttribute("role", "none"));
	
	        listOptions.forEach((listOption) => {
	          listOption.setAttribute("role", "option");
	          listOption.setAttribute("aria-selected", "false");
	          if (listOption.classList.contains("active")) {
	            listOption.setAttribute("aria-selected", "true");
	            comboBox.innerHTML = listOption.innerHTML;
	          }
	        });
	      });
	    }
	    if (option === "reset") {
	      comboBoxs.forEach((comboBox) => {
	        comboBox.setAttribute("aria-expanded", "false");
	      });
	      if (target) {
	        target.setAttribute("aria-expanded", "true");
	      }
	    }
	    if (option === "change") {
	      comboBoxs.forEach((comboBox) => {
	        const listBox = comboBox.nextElementSibling.querySelector(".sel");
	        const listOptions = listBox.querySelectorAll("button");
	
	        comboBox.setAttribute("aria-expanded", "false");
	
	        listOptions.forEach((listOption) => {
	          listOption.classList.remove("active");
	          listOption.setAttribute("aria-selected", "false");
	        });
	      });
	      if (target) {
	        target.setAttribute("aria-selected", "true");
	        target.classList.add("active");
	        target.closest(".calendar-drop-down").querySelector("button").innerHTML = target.innerHTML;
	      }
	
	      // ui 동작 확인용 테스트 코드
	      this.example();
	    }
	  },
	  toggleDateSelector() {
	    this.datePickerArea.forEach((datePicker) => {
	      const selectToggleButtons = datePicker.querySelectorAll(".calendar-drop-down .btn-cal-switch");
	      const selectOptions = datePicker.querySelectorAll(".calendar-select .sel button");
	
	      // 공통 이벤트 처리
	      const handleBtnClick = (event, selectMenu) => {
	        const layer = selectMenu;
	
	        // 이미 활성화된 레이어 닫기
	        if (this.activeDateSelector === layer) {
	          layer.classList.remove("active");
	          this.setupDateComboBox("reset");
	          this.activeDateSelector = null;
	          return;
	        }
	
	        // 현재 열려 있는 레이어가 있으면 닫음
	        if (this.activeDateSelector) {
	          this.activeDateSelector.classList.remove("active");
	          this.setupDateComboBox("reset");
	        }
	
	        // 클릭한 버튼에 해당하는 레이어 열기
	        layer.classList.add("active");
	        this.setupDateComboBox("reset", event.target);
	        this.activeDateSelector = layer;
	      };
	
	      // 셀렉터 설정
	      selectToggleButtons.forEach((toggle) => {
	        toggle.addEventListener("click", (event) => {
	          const selectMenu = event.target.closest(".calendar-drop-down").querySelector(".calendar-select");
	          handleBtnClick(event, selectMenu);
	        });
	      });
	
	      // 년도, 월 선택
	      selectOptions.forEach((option) => {
	        option.addEventListener("click", (event) => {
	          this.resetDateSelector();
	          this.setupDateComboBox("change", event.target);
	
	          // 포커스 이동
	          setTimeout(() => {
	            option.closest(".calendar-drop-down").querySelector(".btn-cal-switch")?.focus();
	          }, 50);
	        });
	      });
	
	      // esc 닫기
	      datePicker.addEventListener("keydown", (event) => {
	        if (event.code === "Escape") {
	          this.resetDateSelector();
	        }
	      });
	    });
	  },
	  actionDatePicker() {
	    this.datePickerArea.forEach((datePicker) => {
	      const actionButtons = datePicker.querySelectorAll(".calendar-btn-wrap button:not(#get-today)");
	      actionButtons.forEach((button) => {
	        button.addEventListener("click", () => {
	          this.closeAllDatePickers();
	        });
	      });
	    });
	  },
	  // ui 동작 확인용 테스트 코드
	  example() {
	    this.datePickerArea.forEach((datePicker) => {
	      const year = datePicker.querySelector(".calendar-switch-wrap .year").innerText.slice(0, -1);
	      const month = datePicker.querySelector(".calendar-switch-wrap .month").innerText.slice(0, -1);
	      const caption = datePicker.querySelector(".calendar-tbl caption");
	      const tblCells = datePicker.querySelectorAll(".calendar-tbl td");
	      const tblCellBtns = datePicker.querySelectorAll(".calendar-tbl td .btn-set-date");
	      const actionBtns = datePicker.querySelectorAll(".calendar-btn-wrap button");
	      let clickCount = 0;
	      let startTd = null;
	
	      // 캡션 설정
	      caption.innerHTML = `${year}년 ${month}월`;
	
	      // 테스트용 (실제 구현에서는 날짜 배열을 받아 처리함)
	      tblCells.forEach((cell) => {
	        const day = cell.querySelector(".btn-set-date").innerText.padStart(2, "0");
	        let [numberYear, numberMonth] = [parseFloat(year), parseFloat(month)];
	        if (cell.classList.contains("old")) {
	          if (numberMonth === 1) {
	            numberYear -= 1;
	            numberMonth = 12;
	          } else {
	            numberMonth -= 1;
	          }
	        } else if (cell.classList.contains("new")) {
	          if (numberMonth === 12) {
	            numberYear += 1;
	            numberMonth = 1;
	          } else {
	            numberMonth += 1;
	          }
	        }
	        cell.setAttribute("data-date", `${numberYear}.${String(numberMonth).padStart(2, "0")}.${day}`);
	      });
	
	      // action
	      const accReset = (action, btn, type) => {
	        // 인풋 단일
	        const targetInput = btn.closest(".calendar-conts").querySelector("input.datepicker.cal");
	        // 인풋 분할
	        const targetInputStart = btn.closest(".calendar-conts").querySelector(".input-group.range.set li:first-child input.datepicker");
	        const targetInputEnd = btn.closest(".calendar-conts").querySelector(".input-group.range.set li:last-child input.datepicker");
	
	        action.addEventListener("click", () => {
	          if (targetInput) {
	            targetInput.setAttribute("type", "text");
	            const target = action.innerText;
	            if (target === "오늘") {
	              accSet();
	            }
	            if (target === "확인") {
	              if (type === "single") {
	                const value = action.closest(".krds-calendar-area").querySelector("td.period.start.end").getAttribute("data-date");
	                targetInput.value = value;
	              } else {
	                const value1 = action.closest(".krds-calendar-area").querySelector("td.period.start")?.getAttribute("data-date");
	                const value2 = action.closest(".krds-calendar-area").querySelector("td.period.end")?.getAttribute("data-date") || "";
	                targetInput.value = `${value1} ~ ${value2}`;
	              }
	            }
	          } else {
	            targetInputStart.setAttribute("type", "text");
	            targetInputEnd.setAttribute("type", "text");
	            const target = action.innerText;
	            if (target === "오늘") {
	              accSet();
	            }
	            if (target === "확인") {
	              const value1 = action.closest(".krds-calendar-area").querySelector("td.period.start")?.getAttribute("data-date");
	              const value2 = action.closest(".krds-calendar-area").querySelector("td.period.end")?.getAttribute("data-date") || "";
	              targetInputStart.value = value1;
	              targetInputEnd.value = value2;
	            }
	          }
	        });
	        // 공통 접근성
	        const accSet = () => {
	          const prevItems = action.closest(".krds-calendar-area").querySelectorAll(".period");
	          prevItems.forEach((prev) => {
	            prev.classList.remove("period", "start", "end");
	            prev.querySelector(".btn-set-date").removeAttribute("aria-pressed");
	          });
	          action.closest(".krds-calendar-area").querySelector("td.today").classList.add("period", "start", "end");
	          action.closest(".krds-calendar-area").querySelector("td.today .btn-set-date").setAttribute("aria-pressed", "true");
	        };
	      };
	
	      // btn-set-date
	      tblCellBtns.forEach((btn) => {
	        // disabled 설정
	        if (btn.closest("td.new, td.old")) {
	          btn.setAttribute("disabled", "true");
	        }
	
	        // var
	        const isSingle = btn.closest(".calendar-wrap").classList.contains("single");
	
	        if (isSingle) {
	          btn.addEventListener("click", () => {
	            tblCellBtns.forEach((otherBtn) => {
	              otherBtn.closest("td").classList.remove("period", "start", "end");
	              otherBtn.removeAttribute("aria-pressed");
	            });
	            btn.closest("td").classList.add("period", "start", "end");
	            btn.setAttribute("aria-pressed", "true");  
	          });
	          // action
	          actionBtns.forEach((action) => {
	            accReset(action, btn, "single");
	          });
	        } else {         
	          btn.addEventListener("click", () => {
	            const currentTd = btn.closest("td");
	            // 현재 td의 날짜
	            const currentDate = new Date(currentTd.getAttribute("data-date"));
	            // 두 번째 클릭일 때, 시작날짜 이전 이면 초기화
	            if (startTd) {
	              const startDate = new Date(startTd.getAttribute("data-date"));
	              if (currentDate < startDate) {
	                console.log("시작날짜 이전은 선택할 수 없습니다.");
	                startTd = null;
	                clickCount = 0;
	                // return;
	              }
	            }
	
	            clickCount++;
	
	            if (clickCount % 2 === 1) {
	              tblCellBtns.forEach((otherBtn) => {
	                otherBtn.closest("td").classList.remove("period", "start", "end");
	                otherBtn.removeAttribute("aria-pressed");
	              });
	              btn.closest("td").classList.add("period", "start");
	              btn.setAttribute("aria-pressed", "true");
	              startTd = currentTd;
	            } else {
	              btn.closest("td").classList.add("period", "end");
	              btn.setAttribute("aria-pressed", "true");
	              let started = false;
	              tblCellBtns.forEach((otherBtn) => {
	                const td = otherBtn.closest("td");
	                if (td === startTd) {
	                  started = true;
	                }
	                if (started && td !== currentTd) {
	                  td.classList.add("period");
	                  otherBtn.setAttribute("aria-pressed", "true");
	                }
	                if (td === currentTd) {
	                  started = false;
	                }
	              });
	              startTd = null;
	            }
	          });
	          // action
	          actionBtns.forEach((action) => {
	            accReset(action, btn);
	          });
	        }
	      });
	    });
	  },
	};
    
    $(document).on('click', '.btn-set-date', function () {
	  const clickedDate = $(this).data('date');
	
	  if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
	    // 선택 초기화
	    selectedStartDate = clickedDate;
	    selectedEndDate = null;
	  } else {
	    // 시작일보다 이전 날짜 클릭 시 swap
	    if (new Date(clickedDate) < new Date(selectedStartDate)) {
	      selectedEndDate = selectedStartDate;
	      selectedStartDate = clickedDate;
	    } else {
	      selectedEndDate = clickedDate;
	    }
	  }
	
	  updateRangeHighlight();
	});
});

function onCalendarRendered() {
  updateRangeHighlight(); // range 상태 복원
}

let selectedStartDate = null;
let selectedEndDate = null;

function formatDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function updateRangeHighlight() {
  if (!selectedStartDate || !selectedEndDate) return;

  const start = new Date(selectedStartDate);
  const end = new Date(selectedEndDate);

  const visibleYear = parseInt($('.btn-cal-switch.year').text());
  const visibleMonth = parseInt($('.btn-cal-switch.month').text());

  $('.calendar-tbl tbody td').each(function () {
    const $td = $(this);
    const btn = $td.find('.btn-set-date');
    const day = parseInt(btn.text());

    if (!day || $td.hasClass('old') || $td.hasClass('new')) {
      $td.removeClass('start end period');
      return;
    }

    const cellDate = new Date(visibleYear, visibleMonth - 1, day);
    $td.removeClass('start end period');

    if (cellDate.getTime() === start.getTime()) {
      $td.addClass('start');
    } else if (cellDate.getTime() === end.getTime()) {
      $td.addClass('end');
    } else if (cellDate > start && cellDate < end) {
      $td.addClass('period');
    }
  });
}

function renderYearButtons(start = 2020, end = 2030) {
    const $yearWrap = $(".calendar-year-wrap .year").empty();
    for (let y = start; y <= end; y++) {
        const $btn = $(`<li><button type="button">${y}</button></li>`);
        $btn.on("click", function () {
            const { month } = getYearMonth();
            renderCalendar(y, month);
        });
        $yearWrap.append($btn);
    }
}

function renderMonthButtons() {
    const $monthWrap = $(".calendar-mon-wrap .month").empty();
    for (let m = 1; m <= 12; m++) {
        const mm = m < 10 ? "0" + m : m;
        const $btn = $(`<li><button type="button">${mm}</button></li>`);
        $btn.on("click", function () {
            const { year } = getYearMonth();
            renderCalendar(year, m);
        });
        $monthWrap.append($btn);
    }
}

function getYearMonth() {
    let year = parseInt($(".btn-cal-switch.year").text());
    let month = parseInt($(".btn-cal-switch.month").text().replace("월", ""));
    return { year, month };
}

function renderCalendar(year, month) {
	$('.calendar-tbl td').removeClass('start end period');
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startWeekDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevMonthLastDate = new Date(year, month - 1, 0).getDate();

    const today = new Date();
    const isThisMonth = today.getFullYear() === year && (today.getMonth() + 1) === month;

    const $tbody = $(".calendar-tbl tbody");
    $tbody.empty();

    let date = 1 - startWeekDay;
    let nextMonthDate = 1;

    for (let row = 0; row < 6; row++) {
        let $tr = $("<tr></tr>");
        for (let col = 0; col < 7; col++) {
            let $td = $("<td></td>");
            let $btn = $("<button type='button' class='btn-set-date'></button>");
            let $span = $("<span></span>");

            if (date < 1) {
                // 이전 달
                $span.text(prevMonthLastDate + date);
                $td.addClass("old");
                if (col === 0) $td.addClass("day-off");
            } else if (date > daysInMonth) {
                // 다음 달
                $span.text(nextMonthDate++);
                $td.addClass("new");
            } else {
                // 현재 달
                $span.text(date);
                if (col === 0) $td.addClass("day-off");
                if (isThisMonth && today.getDate() === date) {
                    $td.addClass("today");
                }
            }

            $btn.append($span);
            $td.append($btn);
            $tr.append($td);
            date++;
        }
        $tbody.append($tr);
        if (date > daysInMonth && nextMonthDate > 7) break;
    }

    // 캡션 및 표시 연월 동기화
    $(".calendar-tbl caption").text(`${year}년 ${month}월`);
    $(".btn-cal-switch.year").text(`${year}년`);
    $(".btn-cal-switch.month").text(`${month < 10 ? '0' + month : month}월`);
    
    krds_calendar.init();
}

function getYearMonth() {
    let year = parseInt($(".btn-cal-switch.year").text());
    let month = parseInt($(".btn-cal-switch.month").text().replace("월", ""));
    return { year, month };
}

