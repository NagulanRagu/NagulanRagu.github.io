import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../model/address';
import { BorrowerDetails } from '../model/borrower-details';
import { GuarantorInfo } from '../model/guarantor-info';
import { LoanRegistration } from '../model/loan-registration';
import { BorrowerDetailsService } from '../service/borrower-details.service';
import { LoanRegistrationService } from '../service/loan-registration.service';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-loan-registration',
  templateUrl: './loan-registration.component.html',
  styleUrls: ['./loan-registration.component.css']
})
export class LoanRegistrationComponent implements OnInit {

  constructor(
    private router: Router, 
    private loanRegistrationService: LoanRegistrationService,
    private borrowerDetailsService: BorrowerDetailsService, 
    private loginService: LoginServiceService,
    public loanRegistration: LoanRegistration, 
    public guarantorInfo: GuarantorInfo,
    public guarantorAddress: Address) { }

  borrowerDetails!: BorrowerDetails;
  uname!: any;
  borrowerName!: string;

  ngOnInit(): void {
    this.loanRegistration = new LoanRegistration();
    this.loanRegistration.guarantorInfo = new GuarantorInfo();
    this.loanRegistration.guarantorInfo.guarantorAddress = new Address();
    this.borrowerDetails = new BorrowerDetails();
    this.uname = this.loginService.getUserName()
    this.borrowerDetailsService.getBorrowerDetails(this.uname).subscribe(
      data => {
        console.log(data);
        this.borrowerDetails = data;
      });
  }

  sendOnClick() {

    this.loanRegistrationService.sendLoanRegistration(this.loanRegistration).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['registration-success']);
      },
      error => {
        console.log(error);
      });
  }
}
