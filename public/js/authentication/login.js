 $('#loginForm').submit(function(event) {
     event.preventDefault();

     const formData = new FormData();
     formData.append('email', $('#email').val());
     formData.append('password', $('#password').val());

     login(formData)
         .then(function(result) {
             console.log(result);
             if (result.token) {
                 window.location.href = `/profile.html`;
             } else {
                 window.location.href = `/login.html`;
             }
         })
         .catch(function(err) {
             console.log(err);
         });
 });