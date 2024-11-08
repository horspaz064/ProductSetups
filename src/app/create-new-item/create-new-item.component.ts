import { Component } from "@angular/core";
declare var $: any;

@Component({
  selector: "App-Create-New-Item",
  templateUrl: "./create-new-item.component.html",
  styleUrl: "./create-new-item.component.css"
})

export class CreateNewItemComponent {
  constructor() { }
  ngOnInit(): void{
    $(document).ready(function(){
      // Handle Add Image and Remove Image actions \\
      $("#addImage").click(function(){
          alert("Add Image button clicked!");
          // Add logic for adding an image
      });

      $("#removeImage").click(function(){
          alert("Remove Image button clicked!");
          // Add logic for removing an image
      });

      // Handle Not For Sale Popup
      $("#notForSalePopup").hide();

      $(".notForSale").click(function(){
        // Set this dynamically if needed \\
          let itemName = "Sample Item";
          $("#itemNamePlaceholder").text(itemName);
          $("#notForSalePopup").show();
      });

      $("#cancelPopup").click(function(){
          $("#notForSalePopup").hide();
      });

      $("#confirmNotForSale").click(function(){
          let enteredName = $("#itemInput").val();
          if(enteredName) {
              alert("Item marked as Not For Sale: " + enteredName);
              $("#notForSalePopup").hide();
          } else {
              alert("Please enter item name");
          }
      });

      // Handle Save Item action
      $("#saveItem").click(function(){
          alert("Save button clicked!");
          // Add logic to save the item details \\
      });
  });
  }
}
