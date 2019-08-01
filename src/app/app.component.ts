import {Component} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Http} from '@angular/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public usPhoneMask = ['+',/[0-1]/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  title = 'app';

  validationForm: FormGroup;

  stateCtrl: FormControl;
  filteredStates: any;
  listCommonCtrl: FormControl;
  listedCommonData: any ;
  listDisabledCtrl: FormControl;
  listedDisabledData: any;
  listCtrl: FormControl;
  listedData: any ;
  selectedList: any;
  selectedRequiredList: any;
  selectedDisabledList: any;
  readOnlyText = 'Read Only';
  autoCompleteDisabled  = true;

  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];


  data  = [
    {
      id: 1,
      name : '1111111 - FF Torn Smith',
    },
    {
      id: 2,
      name : '2222222 - LT Bill Smith',
    },
    {
      id: 3,
      name : '3333333 - CART Hank Smith',
    },
    {
      id: 4,
      name: '1222222 - FF Sally P Smith',
    },
    {
      id: 5,
      name: '2111111 - BC Bill Smith',
    },
    {
      id: 6,
      name : '3111111 - EMT Tony J Smith',
    },
  ];

  constructor(private fb: FormBuilder, private http: Http) {
    this.stateCtrl = new FormControl();
    this.listCtrl  = new FormControl({value: ''}, Validators.required);
    this.listCommonCtrl = new FormControl();
    this.listDisabledCtrl = new FormControl({value: '', disabled: true});

    this.selectedList = '';
    this.selectedRequiredList = '';
    this.selectedDisabledList = '';

    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));

    this.listedDisabledData = this.listDisabledCtrl.valueChanges
      .startWith(null)
      .map(val => this.displayDisabledFn(val))
      .map(name => this.listDisabledData(name));

    this.listedCommonData = this.listCommonCtrl.valueChanges
      .startWith(null)
      .map(val => this.displayCommonFn(val))
      .map(name => this.listCommonData(name));


    this.listedData = this.listCtrl.valueChanges
      .startWith(null)
      .map(val => this.displayFn(val))
      .map(name => this.getMatchedItems(name));
  }

  ngOnInit(): any{
    this.validationForm = this.fb.group({
      zipcode: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(\d{5}-\d{4}|\d{5})$/)
      ])],
      usPhoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[+][0-1]{1} [(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/)
      ])]
    })
  }


  changeDisabled() {
    this.autoCompleteDisabled = !this.autoCompleteDisabled;
    if (this.autoCompleteDisabled) {
      this.listDisabledCtrl.disable();
    }else {
      this.listDisabledCtrl.enable();
    }
  }

  filterStates(input: string) {
    const res = this.states.filter( entry => entry.toLowerCase().indexOf( input ) !== -1);
    if ( res ) {
      return res;
    }else {
      return this.states;
    }

    // return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) !== -1) : this.states;
  }


  displayCommonFn(value: any): string {
    if(value && typeof value === 'object'){
      return value.name;
    }else{
      return value;
    }
  }

  listCommonData(val){
    if (val) {
      const filterValue = val.toLowerCase();
      return this.data.filter(data => data.name.toLowerCase().startsWith(filterValue));
    }
    return this.data;
  }

  displayDisabledFn(value: any): string {
    if(value && typeof value === 'object'){
      return value.name;
    }else{
      return value;
    }
  }

  listDisabledData(val) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.data.filter(data => data.name.toLowerCase().startsWith(filterValue));
    }
    return this.data;
  }

  displayFn(value: any): string {
    if(value && typeof value === 'object'){
      return value.name;
    }else{
      if (this.listCtrl) {
        this.listCtrl.setErrors({'incorrect': true});
      }
      return value;
    }
  }

  getMatchedItems(val) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.data.filter(data => data.name.toLowerCase().indexOf(filterValue) !==  -1);
    }
    return this.data;
  }

}
