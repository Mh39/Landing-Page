//Global Variables
const navsec = document.getElementsByTagName("section");
const Nav_List = document.querySelector("#navbar__list");

// start Helper Functions
function SetNav(Link_Name, Sec_Id)
 {
  // create  link
  const Add = `<li>
  <a href="#${Sec_Id}"
   class="MenuLink">${Link_Name}</a>
   </li>`;
  // Add
  Nav_List.insertAdjacentHTML("beforeend", Add);
}
//top
function Is_Top_Section_in_Viewport(xx)
 {
  const rec = xx.getBoundingClientRect();
  return (
    rec.top >= 0 &&
    //  overlapping 
    rec.top <=
      0.5 * (window.innerHeight || document.documentElement.clientHeight)
  );
}
//getElementOffset
function getElementOffset(ele)
 {
  const g_rect = ele.getBoundingClientRect();
  // return  the element absolute top/left 
  return {
    top: g_rect.top + window.pageYOffset,
    left: g_rect.left + window.pageXOffset
  };
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the navigation
function Build_Nav(navsec)
 {
  for (const sec of navsec) 
  {
    let Link_Name = sec.getAttribute("Nav_Data");
    let Sec_Id = sec.getAttribute("id");
    SetNav(Link_Name, Sec_Id);
  }
}
// Add class 'active' 
function set_Section(navsec)
 {
  for (const section of navsec)
   {
    // detect the navigation link 
    const Active = document.querySelector(
      `a[href="#${section.getAttribute("id")}"]`
    );
    // checks if the current section is near top of viewport
    if (Is_Top_Section_in_Viewport(section)) 
    {
            section.classList.add("active");
      Active.classList.add("MenuLink--active");
    } 
    else 
    {
      // remove active function
      section.classList.remove("active");
      Active.classList.remove("MenuLink--active");
    }
  }
}

// Scrolling section anchor ID 
function SM_Sceoll(s) 
{
  window.scrollTo(
    {
    //scroll to element
    top: getElementOffset(s).top - Nav_List.offsetHeight,
    left: getElementOffset(s).left,
    behavior: "smooth"
  }
  );
}
// create a "Go to Top" hidden floating button
function Go_Up()
 {
  const Add = `<a href="#" class="bottom__link hide"> Go To Top</a>`;
  document.body.insertAdjacentHTML("afterbegin", Add);
}
//Show_Botton_Up function
function Show_Botton_Up()
 {
  // creatting buttom
  const btn = document.querySelector(".bottom__link");
  // remove the button 
  if (window.pageYOffset <= 0.7 * window.innerHeight) {
    btn.classList.add("hide");
  }
   else
    {
    btn.classList.remove("hide");
    // add event handler only if button is visible
    btn.addEventListener("click", function(e)
     {
      e.preventDefault();
      // smooth scroll to top of page
      window.scrollTo(
        {
        top: 0,
        left: 0,
        behavior: "smooth"
      }
      );
    });
  }
}

// show navigation bar after delay is elapsed
// Timer getting reset  until the user stop scrolling
function Hide_Nav(delay) 
{
  let Timer;
  Timer && clearTimeout(Timer);
  Nav_List.classList.add("hide");
  Timer = setTimeout(function() 
  {
    Nav_List.classList.remove("hide");
  },
   delay);
}


/**
 * End Main Functions
 * Begin Events
 *
 */
document.addEventListener("DOMContentLoaded", function() 
{
 
  Build_Nav(navsec);
  Go_Up();

  // Scrolling to section 
  Nav_List.addEventListener("click", function(e) 
  {
    if (e.target.nodeName === "A")
     {
      e.preventDefault();
      // getting the click link
      const activeSection = document.querySelector(
        `section[id = ${e.target.getAttribute("href").slice(1)}]`
      );
      // smooth scrolling to the click link
      SM_Sceoll(activeSection);
    }
  });

 //setTimeout
  setTimeout(
    window.addEventListener("scroll", function()
     {
      set_Section(navsec);
      Hide_Nav(1000);
      Show_Botton_Up();
    }),
        );
});
