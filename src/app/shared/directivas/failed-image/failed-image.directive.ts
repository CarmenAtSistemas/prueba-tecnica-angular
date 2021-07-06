import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[failedImage]',
  host: {
    '(error)': 'onError()'
  }
})

export class FailedImageDirective{

  constructor(private elemenRef: ElementRef, private renderer: Renderer2) { 

  }

  public onError(){
    this.renderer.setProperty(this.elemenRef.nativeElement, 'src', 'http://dummyimage.com/400x600.png/dddddd/000000&text=not+avaliable+image');
    this.renderer.setStyle(this.elemenRef.nativeElement, 'border', 'solid 2px red');
  
  }

}
