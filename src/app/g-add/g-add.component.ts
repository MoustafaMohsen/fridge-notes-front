import { FormatService } from './../frormat.service';
import { Grocery, MoreInformation } from './../Grocery';
import { Component, OnInit,Input } from '@angular/core';
import { GListService } from './../g-list.service';

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
  @Input() GList:Grocery[];
  NeededOnly:Grocery[]=[{ name:'',moreInformations:[{bought:false}]}];

  @Input() lastmoreInformations:MoreInformation={bought:false  ,no:1 ,typeOfNo :""};

  constructor(private GListService:GListService,private formatService:FormatService) { }
  ngOnInit() {
  }

  //add method
  add(g:Grocery){  //(click) Add to List button
    if (g.name =='')
    {
      this.GListService.snackBar.open(""+"Empty Name", "X", {
      duration: 2000,
    });;
      return}//if the data is empty
    this.GListService.isGroceryNameExsits(g.name).subscribe(
      (res)=>{
      console.log(res);
      if(res){
        this.GListService.snackBar.open(""+"Item Name already exsits", "X", {
          duration: 2000,
        });;
        //Name exsists already
        return
       }
      if(!res){
        g.timeout =  this.timeoutDay*3600*24 
        var grocery =this.formatService.Toadd(g,g.name,g.basic,g.timeout,this.lastmoreInformations);
        this.GListService.UpdateStatus(grocery,"add");
        this.GList.push(grocery)
      }
    })

  }

  
  //Needed Logic
  Needed(g:Grocery){   //(click) Needed button
    g.timeout =  this.timeoutDay*3600*24 
    var grocery= this.formatService.Toneed(g,g.basic,g.timeout,this.lastmoreInformations);
    this.GListService.UpdateStatus(grocery,"needed");
    this.clean()
  }

  GetNeededOnly(){  //(click) Add button
    this.NeededOnly =this.GListService.GetNeededOnly();    
  }

  SelectedSuggestion(g:Grocery){  //(click) Suggestion button
    this.lastmoreInformations=g.moreInformations[g.moreInformations.length -2]//last needed status
    this.Item =g;
    this.MakeitNeeded=true
  }
  
  clean(){ //(click) Add button
    this.MakeitNeeded=false;
    this.Item ={ name:'',moreInformations:[{bought:false ,no:1 , typeOfNo :""}] }
  }

}//class


