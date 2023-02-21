import React, {useEffect, useState} from "react";

import { StorageToken } from "../../../nfu-ukr-common/contracts";
import GalleryStyle from "./Gallery.module.scss";



  const loadGalleryItems = async (): Promise<StorageToken[]>  => {
      const items: Promise<StorageToken[]> = (await fetch("http://localhost:3000/api/tokens")).json();

      return items;
  }

const Gallery = (): JSX.Element => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tokens, setTokens] = useState<StorageToken[]>([]);

    const fetch = (): void => {
      setIsLoading(true);
      loadGalleryItems().then(
          (value) => {
            setTokens(value);
          }
        ).finally(
          () => setIsLoading(false)
        );
    }

    useEffect(() => {
       fetch();
    }, [])

    return (

      <section className={`${GalleryStyle.gallery} container`} id="gallery">
        <h1>Галерея</h1>
        {
          isLoading 
          ? null
          : (
            tokens.map((token) => 
              <div className={GalleryStyle.product}>
                <div className={GalleryStyle.product_card}>
                  <h2 className={GalleryStyle.name}>{token.name}</h2>
                  <span className={GalleryStyle.price}>$140.00</span>
                  <a className={GalleryStyle.popup_btn}>Подробиці</a>
                  <img src={token.image.replace("ipfs://", "https://ipfs.io/ipfs/")} className={GalleryStyle.product_img} alt="image"/>
                </div>
                <div className={GalleryStyle.popup_view}>
                  <div className={GalleryStyle.popup_card}>
                    <a><i className="fas fa-times close-btn"></i></a>
                    <div className={GalleryStyle.product_img}>
                      <img src="/wireframes/Russian_occupier.jpg" alt="image"/>
                    </div>
                    <div className={GalleryStyle.info}>
                      <h2>ОРК</h2><span>колекція орки</span>
                      <span className={GalleryStyle.price}>$ 140.00</span>
                      <a href="#" className={GalleryStyle.add_cart_btn}>Купити</a>
                      <p>У літературі орками називали армію міфічних істот, які були відлюдниками з низьким інтелектом. У
                        розумінні англійського письменника Джона Толкіна, орки – це темні створіння, які втілюють зло. Вони
                        підкорялися Темному Володарю і становили основу його збройних сил. Їх військо підкорювало не силою, а
                        кількістю. Орки мали вкрай низький інтелект і не звикли жити в комфорті..</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        }  
      </section>
    )
}

export default Gallery;