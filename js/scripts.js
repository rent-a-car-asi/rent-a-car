// Back to Top
$(document).ready(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 50) $("#back-to-top").fadeIn();
      else $("#back-to-top").fadeOut();
    });

    // scroll body to 0px on click
    $("#back-to-top").click(function() {
      $("body,html").animate({ scrollTop: 0 }, 800);
      return false;
    });


    $('.sidebar-box-header').click(function(){
      $(this).find('i').not('.fa-filter').toggleClass('fa-plus fa-minus')
    });

    $('#dateStart').datetimepicker({ 
      value: '10.03.2019    10:00 ',
      format: 'dd.mm.yyyy   HH:MM',
      locale: 'bg-bg',
      datepicker: { weekStartDay: 1 },
      size: 'default',
      footer: true, 
      modal: false });

      $('#dateEnd').datetimepicker({ 
      value: '19.03.2019    10:00 ',
      format: 'dd.mm.yyyy   HH:MM',
      locale: 'bg-bg',
      datepicker: { weekStartDay: 1 },
      size: 'default',
      footer: true, 
      modal: false });
  });