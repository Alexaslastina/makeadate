class DarkWindow {


  static createDarkWindow() {
    let darkWindowCss = {
      position: "fixed",
      width: "100%",
      height: "100%",
      background: "rgb(255, 239, 213. 2)",
      top: 0,
      left: 0,
      zIndex: 999,
      display: "none",
      justifyContent: "center",
      alignItems: "center"

    }

    let darkBoxCss = {
      maxWidth: "500px",
      width: "100%",
      minHeight: "300px",
      background: " #ffe6e6",
      border: "2px solid rgb(194, 194, 163)",
      textAlign: "center"
    }

    $("body").prepend(`
    <div class="dark_window">
    <div class="dark_box p-3">
        <img src="images/pic1.jpg"  class="w-50">
        <h3>tittle</h3>
        <button >close</button>
      </div>
    </div>
    `)

    $(".dark_window").css(darkWindowCss);
    $(".dark_window .dark_box").css(darkBoxCss);

    DarkWindow.darkViewEvents();
  }

  static darkViewEvents(){
    $(".dark_window button").on("click",() => {
      $(".dark_window").fadeOut(300);
    })
  }

 
  static showDarkWindow(_urlImg,_titleH3){
    $(".dark_window").fadeIn(600);
    $(".dark_window").css("display","flex");
    $(".dark_window img").attr("src",_urlImg);
    $(".dark_window h3").html(_titleH3);
  }


}