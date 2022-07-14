import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.css']
})
export class DrawCanvasComponent implements OnInit {
  @ViewChild("player") player!: ElementRef;

  @HostListener("document:keydown", ['$event'])
  handlekey($event: KeyboardEvent): void {
    console.log($event.key);
    this.movePlayer($event.key);
  }

  @HostListener('document:click', ['$event.target'])
  handleClick($event: HTMLElement): void {
    const nameClass = $event.classList.toString();
    this.changeImage(nameClass);
    }

  public image = ['/assets/fantasma.jpg','/assets/fantasma_rojo.png']

  constructor(private render2: Renderer2) { }

  ngOnInit(): void {
  }

  private movePlayer(eventKey: string): void {
    const playerElement = this.player.nativeElement;
    console.log(playerElement.style)

    if (eventKey === "ArrowRight") {
      const { left = "0px" } = playerElement.style;
      console.log('left', left)
      const parseValue = Number(left.replace('px', ''));
      this.render2.setStyle(playerElement, "left", `${parseValue + 50}px`)
    }

    if (eventKey === "ArrowLeft") {
      const { left = "0px" } = playerElement.style;
      console.log('left', left)
      const parseValue = Number(left.replace('px', ''));
      this.render2.setStyle(playerElement, "left", `${parseValue - 50}px`)
    }

    if (eventKey === "ArrowUp") {
      this.render2.addClass(playerElement, 'jump-player')
      setTimeout(() => {
        this.render2.removeClass(playerElement, 'jump-player')
      }, 2000)
    }
  };

  private changeImage(nameElement: string): void {
    if (nameElement === 'player-image') {
      this.image.reverse();
      setTimeout(() => {
        this.image.reverse()
      }, 1000)
    }
  }

}
