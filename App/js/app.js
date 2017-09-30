//validation
function validFunc(submitId, nameId, surnameId, telId, mailId, selectId, messageId, accId, decId) {

    $(submitId).click(function (event) {
        var name = $(nameId).val();
        var surname = $(surnameId).val();
        var telephone = $(telId).val();
        var email = $(mailId).val();
        var projects = $(selectId).val();
        var message = $(messageId).val();
        var nameReg = /^[A-Za-zşŞıİçÇöÖüÜĞğ]+$/;
        var numberReg = /^[0-9]+$/;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var kabul = $(accId);
        var kdegil = $(decId);


        if (name == "") {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen adınızı giriniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();

        } else if (!nameReg.test(name)) {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen geçerli bir ad giriniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();

        } else if (surname == "") {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen soyadınızı giriniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();

        } else if (!nameReg.test(surname)) {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen geçerli bir soyad giriniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();

        } else if (telephone == "") {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen telefon numaranızı giriniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();

        } else if (!numberReg.test(telephone)) {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen geçerli bir telefon numarası giriniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();
        } else if (!kabul.is(':checked') && !kdegil.is(':checked')) {
            swal({
                title: 'Uyarı!',
                text: 'Lütfen yasal uyarıyı kabul edip etmediğinizi belirtiniz',
                type: 'warning',
                confirmButtonText: 'OK'
            });
            event.preventDefault();
        } else {
            $(submitId).click(function () {
                return true;
            });
        }
    });

};
validFunc('#submit', '#ad', '#soyad', '#tel', '#email', '#proje', '#mesaj', '#ke', '#kt');
//validFunc('#Msubmit', '#Mad', '#Msoyad', '#Mtel', '#Memail', '#Mproje', '#Mmesaj', '#Mkd', '#MdecId');