import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  leonardoImages = [
    {
      src: 'https://i1.wp.com/www.hobbymedia.it/img/2011/02/katapult.jpg',
      alt: 'Leonardo da Vinci Machine 1'
    },
    {
      src: 'https://www.intoscana.it/wp-content/uploads/macc.jpg',
      alt: 'Leonardo da Vinci Machine 2'
    },
    {
      src: 'https://www.ibs.it/images/9788868609702_1_536_0_75.jpg',
      alt: 'Leonardo da Vinci Machine 3'
    },
    {
      src: 'https://m.media-amazon.com/images/I/51ESFKnPw3L._SL500_.jpg',
      alt: 'Leonardo da Vinci Machine 4'
    },
    {
      src: 'https://media-assets.wired.it/photos/615dbcbb6932a0ab475119eb/16:9/w_2580,c_limit/innovazioni-leonardo.jpg',
      alt: 'Leonardo da Vinci Machine 5'
    },
    {
      src: 'https://www.formacultura.it/wp-content/uploads/2021/09/LEO01-Leonardo-Bicicletta-003-600x330-1.jpg',
      alt: 'Leonardo da Vinci Machine 6'
    }
  ];
}
