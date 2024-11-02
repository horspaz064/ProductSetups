import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  ngOnInit() {
    $(document).ready(function () {
      $("#mymenu").click(function(){
        $(".menu").css(
          "display", "block"
        );
        $("#mymenu").hide()
      })
      $("#mymenu2").click(function () {
        $(".menu").css(
          "display", "none"
        );
        $("#mymenu").show()
      })
    })
  }
}
