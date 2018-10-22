import { FormatService } from '../Services/frormat.service';
import { Grocery, MoreInformation } from './../Grocery';
import { Component, OnInit,Input } from '@angular/core';
import { GListService } from '../Services/g-list.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-g-add',
  templateUrl: './g-add.component.html',
  styleUrls: ['./g-add.component.css']
})
export class GAddComponent implements OnInit {

  buttonClick:boolean;
  MakeitNeeded:boolean=false;
  @Input() timeoutDay;
  @Input() Item:Grocery = { name:'',moreInformations:[{bought:false  ,no:1 ,typeOfNo :""}] ,timeout:0};
  @Input() lastmoreInformations:MoreInformation={bought:false  ,no:1 ,typeOfNo :""};

  NeededOnly:Grocery[]=[{ name:'',moreInformations:[{bought:false}]}];
  
  formItem:FormGroup;

  //---------remove private formBuilder
  constructor(  public web:GListService,formBuilder:FormBuilder,
    private formatService:FormatService,private snackBar:MatSnackBar )
  {
    this.formItem=formBuilder.group({
      name:["",[Validators.required] ],
      no:[1,[Validators.required] ],
      type:["",[] ],
      basic:[false,[] ],
    })
  }
  ngOnInit() {
  }

  //add method
  add(g:Grocery){  //(click) Add to List button
    g.name = this.f.name.value;
    g.moreInformations[0].no=this.f.no.value;
    g.basic=this.f.basic.value;
    g.moreInformations[0].typeOfNo=this.f.type.value
    console.log(g);
    
    if (g.name =='')
    {
      this.snackBar.open(""+"Empty Name", "X", {duration: 2000});;
      return;
    }//if the data is empty
    console.log("sending add");
    console.log(g);
    
      {
        g.timeout =  this.timeoutDay*3600*24 
        var grocery =this.formatService.Toadd(g,g.name,g.basic,g.timeout,this.lastmoreInformations);
        this.web.request(grocery,"add")
          
        //GET All  from Api
        .subscribe(
          (r)=>{
            console.log("===addeubscribe==");
            console.log(r);
            console.log("===end addsubscribe==");
            this.web.UpdateList$.next();
        },
        (e)=>{
          console.log("===add Error==");
          console.log(e);
          console.log("===add Error==");
          
          this.snackBar.open("Failed to add item","X",{duration:5000})
        }
      )
      }
      /*
    this.web.isGroceryNameExsits(g.name).subscribe(
      (res)=>{
      console.log("isGroceryNameExsits() add");
        
      console.log(res);
      if(res){
        this.web.snackBar.open(""+"Item Name already exsits", "X", {
          duration: 2000,
        });;
        //Name exsists already
        return
       }
      if(!res){
        g.timeout =  this.timeoutDay*3600*24 
        var grocery =this.formatService.Toadd(g,g.name,g.basic,g.timeout,this.lastmoreInformations);
        this.web.request(grocery,"add")
          
        //GET All  from Api
        .subscribe(
          (r)=>{
            console.log("===addeubscribe==");
            console.log(r);
            console.log("===end addsubscribe==");
            this.web.UpdateList$.next();
        },
        (e)=>{
          console.log("===add Error==");
          console.log(e);
          console.log("===add Error==");
          
          this.snackBar.open("Failed to add item","X",{duration:5000})
        }
      )
      }
    })
    */

  }

  get f(){return this.formItem.controls}

  //Needed Logic
  Needed(g:Grocery){   //(click) Needed button
    g.timeout =  this.timeoutDay*3600*24 
    var grocery= this.formatService.Toneed(g,g.basic,g.timeout,this.lastmoreInformations);
    this.web.UpdateStatus(grocery,"needed");
    this.clean()
  }


  SelectedSuggestion(g:Grocery){  //(click) Suggestion button
    console.log("SelectedSuggestion()")
    console.log(g)
    this.lastmoreInformations=g.moreInformations[g.moreInformations.length -2]//last needed status
    this.Item =g;
    this.MakeitNeeded=true
  }
  
  clean(){ //(click) Add button
    this.MakeitNeeded=false;
    this.Item ={ name:'',moreInformations:[{bought:false ,no:1 , typeOfNo :""}] }
  }

}//class


