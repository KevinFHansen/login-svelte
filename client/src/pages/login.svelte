<script>
    import logo from "../../public/logo.png"
    import {Link, navigate} from "svelte-navigator";
    import toastr from "toastr";
    import { token } from "../store/globals.js"
  
    let email = "";
    let password ="";
    const login = async () => {
        const response = await fetch(`http://localhost:8080/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            credentials: "include"
        }).then(res => res.json()).then(result => {
            console.log(result.user.role)
        
          if(result.user.email === email){
            console.log("WEOUTHERE")
          localStorage.setItem('token', '1');
          localStorage.setItem('role', `${result.user.role}`);
          token.set(localStorage.getItem('token'));
          token.set(localStorage.getItem('role'));
          
          
          console.log(result)
            if(result.user.role === "admin"){
              toastr["success"]("Welcome " + result.user.username)
              setTimeout(() => {
                location.reload();
                navigate('/dashboard', { replace: true });
                
              }, 3000)
              
            }
            else{
            toastr["success"]("Welcome " + result.user.username)
            setTimeout(() => {
                location.reload();
                navigate('/frontpage', { replace: true });
              }, 3000)
      
            }
          } 
          if(result.message){
          toastr["error"](result.message)
          console.log(result)
          }
          
          
})};

</script>


<form on:submit|preventDefault={login}>

    <div class="imgcontainer">
      <img src={logo} alt="Avatar" class="avatar">
    </div>

    <div class="container">
      <label for="Email"><b>Email</b></label>
      <input type="email" placeholder="Enter Email" name="email" required id="email" bind:value={email}>
  
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required bind:value="{password}">
  
      <button type="submit" id="postlogin">Login</button>
    
      <a href="/forgotpassword">Forgot password? Click here</a>
      <br>
      <Link to="/signup">Sign Up - Click here</Link>
    </div>
  </form>
  
<style>

/* Bordered form */
form {
  border: 3px solid #f1f1f1;
  margin-top: 5%;
  width: 550px;
 
}

/* Full-width inputs */
input[type=text], input[type=email], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}



</style>