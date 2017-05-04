 $('#loginForm').submit(function(event) {
     event.preventDefault();

     const formData = new FormData();
     formData.append('email', $('#email').val());
     formData.append('password', $('#password').val());

     login(formData)
         .then(function(result) {
             if (result == undefined) {
                 window.location.href = `/login.html`;
             } else {
                 window.location.href = `/profile.html`;
             }
         })
         .catch(function(err) {
             console.log(err);
         });
 });