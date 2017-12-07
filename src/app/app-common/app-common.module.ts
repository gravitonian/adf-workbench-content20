import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule, TRANSLATION_PROVIDER } from '@alfresco/adf-core';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';

export function modules() {
  return [
    /* Angular Core */
    CommonModule,

    /* Flex Layout */
    FlexLayoutModule,

    /* Alfresco ADF + Angular Material Components */
    CoreModule,
    ContentModule,
    ProcessModule
  ];
}

@NgModule({
  imports: modules(),
  declarations: [],
  providers: [
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: 'app',
        source: 'assets'
      }
    }
  ],
  exports: modules()
})
export class AppCommonModule { }
