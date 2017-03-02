import { NgModule }       from '@angular/core';

import { AreYouSureComponent } from './AreYouSure/areyousure.component';


@NgModule({
    declarations: [AreYouSureComponent],
    exports: [AreYouSureComponent]
})

export class SharedModule { }