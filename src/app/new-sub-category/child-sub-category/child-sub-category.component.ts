import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-child-new-sub',
  templateUrl: './child-sub-category.component.html',
})
export class ChildNewSubCategory implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const $dropdownButton = $('#multiSelectDropdown');
    const $dropdownMenu = $('.dropdown-menu');
    let mySelectedItems: string[] = [];

    const handleCB = (event: Event) => {
      const $checkbox = $(event.target);
      if ($checkbox.is(':checked')) {
        mySelectedItems.push($checkbox.val() as string);
      } else {
        mySelectedItems = mySelectedItems.filter(
          (item) => item !== $checkbox.val()
        );
      }

      $dropdownButton.text(
        mySelectedItems.length > 0 ? mySelectedItems.join(', ') : 'Select Items'
      );
    };

    $dropdownMenu.on('change', 'input[type="checkbox"]', handleCB);
  }
}
