class ImgClass{
  constructor(_parent,_img,_alt){
    this.parent = _parent;
    this.img = _img;
    this.alt = _alt;
    this.render()
  }

  render(){
    let newImg = $(`<img src="${this.img}" alt="${this.alt}" >`);
    $(this.parent).append(newImg);

    $(newImg).on("click", () => {
      DarkWindow.showDarkWindow(this.img,this.alt);
    })
  }
}