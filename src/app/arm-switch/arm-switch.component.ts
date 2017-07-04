// arm-switch.component
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LOCKED, UNLOCKED, LOCKED_OUT, ARM, DISARM, RESET } from '../lock/lock.service';

type LockState = 'LOCKED' | 'UNLOCKED';
type Action = 'ARM' | 'DISARM' | 'RESET';

@Component({
  selector:    'f-arm-switch',
  templateUrl: './arm-switch.component.html',
  styleUrls:   [
    './arm-switch.component.slide.css',
    './arm-switch.component.slider.css',
    './arm-switch.component.css'
  ]
})
export class ArmSwitchComponent {
  @Input() lock: LockState;
  @Output() onEvent = new EventEmitter<Action>();

  arming = false;

  get buttonClasses() {
    return {
      armed: this.lock === LOCKED,
      arming: this.arming,
      ready: this.lock === UNLOCKED && !this.arming,
      lockedout: this.lock === LOCKED_OUT
    };
  }

  get buttonText(): string {
    const phrases = {
      [LOCKED]: 'Armed',
      [UNLOCKED]: 'Slide to arm',
      [LOCKED_OUT]: 'Busy',
    };

    return phrases[this.lock] || 'Hello!';
  }

  startDrag(e): void {
    e.preventDefault();
    e.stopPropagation();

    if (this.lock !== LOCKED_OUT) {
      const slider = e.target;
      const slide = e.target.parentElement;
      let targetTouches = e.targetTouches;

      this.arming = true;

      const slideRect = slide.getBoundingClientRect();
      const sliderRect = slider.getBoundingClientRect();
      const maxX = slideRect.width - sliderRect.width;
      const threshold = maxX * 0.75;

      slider.style.left = this.lock === LOCKED ? maxX : '';

      const moveSlider = (e) => {
        targetTouches = e.targetTouches;
        const pointerPos = (e.clientX || targetTouches.item(0).clientX) - slideRect.left;

        let x = pointerPos - (sliderRect.width / 2);
        x = Math.max(0, x);
        x = Math.min(maxX, x);

        slider.style.left = x + 'px';
      };

      const stopDrag = (e) => {
        slider.removeEventListener('mousemove', moveSlider);
        slider.removeEventListener('touchmove', moveSlider);
        slider.removeEventListener('mouseleave', stopDrag);
        slider.removeEventListener('touchleave', stopDrag);
        slider.removeEventListener('mouseup', stopDrag);
        slider.removeEventListener('touchend', stopDrag);

        this.arming = false;
        const pointerPos = (e.clientX || targetTouches.item(0).clientX) - slideRect.left;

        if (pointerPos < maxX) {
          slider.style.transition = 'left 0.5s';
        }

        if (pointerPos >= threshold) {
          this.onEvent.emit(ARM);
          slider.style.left = `${maxX}px`;
        } else {
          slider.style.left = '0px';
          if (this.lock === LOCKED) {
            this.onEvent.emit(DISARM);
          }
        }

        setTimeout(() => slider.style.transition = '', 400);
      };

      slider.addEventListener('mousemove', moveSlider);
      slider.addEventListener('touchmove', moveSlider);
      slider.addEventListener('mouseleave', stopDrag);
      slider.addEventListener('touchleave', stopDrag);
      slider.addEventListener('mouseup', stopDrag);
      slider.addEventListener('touchend', stopDrag);
    }
  }
}
