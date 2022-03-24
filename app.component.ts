import { Component } from "@angular/core";
import { AuthenticationService } from "./authservice.service";
import { CookieService } from "ngx-cookie-service";
import { ErrorConstants } from "./app.error-constants";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  errorMessage:any;
  errorType:string;

 
  constructor(
    private auth: AuthenticationService,
    private cookies: CookieService,
    private toastr: ToastrService
  ) {
    
//     sessionStorage.setItem("userId", cookies.get("PROFILE_ID"));
//     sessionStorage.setItem(
//       "userName",
//       cookies
//         .get("USER_NAME")
//         .substring(
//           cookies.get("USER_NAME").indexOf('"') + 1,
//           cookies.get("USER_NAME").length - 1
//         )
//     ); 

        sessionStorage.setItem("userId", "PT02944");
        sessionStorage.setItem("userName", "Praveen T");



        sessionStorage.setItem("userId", "PT02944");
        sessionStorage.setItem("userName", "Praveen T");



        sessionStorage.setItem("userId", "PT02944");
        sessionStorage.setItem("userName", "Praveen T");



        sessionStorage.setItem("userId", "PT02944");
        sessionStorage.setItem("userName", "Praveen T");


    if (sessionStorage.getItem("userName").length < 1) {
      window.location.href = "resources/j_spring_security_logout";
    }

    if (this.auth.IsLogIn) {
      this.auth.authenticate();
    } else {
      this.auth.authenticate();
    }

    this.auth.getErrors().subscribe((data) => {
      let serverMessage = "";
      if (data) {
        if (typeof data.message === "string") serverMessage = data.message;
        else if (typeof data.message.message === "string")
          serverMessage = data.message.message;
        // look for UI error message in app.error-constants.ts
        let errorResponse = ErrorConstants.MESSAGES.find((obj) =>
          serverMessage.includes(obj.SERVER_MESSAGE)
        );
        if (errorResponse) {
          if (errorResponse.ACTION === "SHOW") {
           
              if (data.errorType ==='error') {
                this.toastr.toastrConfig.titleClass="toast-title-error";
                this.toastr.error(errorResponse.UI_MESSAGE,'Error' );
              }
              else if (data.errorType ==='warning') {
                this.toastr.toastrConfig.titleClass="toast-title-info";
                this.toastr.info(errorResponse.UI_MESSAGE,'Info' );        
              }
              else if (data.errorType ==='success') {
                this.toastr.toastrConfig.titleClass="toast-title-success";
                this.toastr.success(errorResponse.UI_MESSAGE,'Success' );   
              }
          } else if (errorResponse.ACTION === "NO_SHOW") {
    
          }
        } else {
          // display errors which are not in app.error-constants.ts
          this.toastr.toastrConfig.titleClass="toast-title-error";
          this.toastr.error(serverMessage,'Error' );

        }
      } 
    });
  }

  clearError() {
    this.errorType = "";
    this.errorMessage = "";
  }
}



