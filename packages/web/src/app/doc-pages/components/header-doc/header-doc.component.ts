import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss'],
})
export class HeaderDocComponent {
  internalHeader = false;
  figmaUrl = getComponent('header').figmaUrl;
  description = getComponent('header').description;

  internalHeaderExample = `<div class="e-header">
  <!--TOP MENU-->
  <div class="e-header__top-bar">

    <!--TOP MENU ~ MOBILE-->
    <div class="e-header__top-bar-mobile">

      <!--APP-->
      <div class="e-header__top-bar-mobile__app">
        <div class="e-header__top-bar-mobile__title">Applications</div>
        <a class="e-header__top-bar-mobile__link">
          <span>DROPS</span>
          <span class="e-header__top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-header__top-bar-mobile__divider"></div>

      <!--AREA-->
      <div class="e-header__top-bar-mobile__area">
        <div class="e-header__top-bar-mobile__title">Area</div>
        <a class="e-header__top-bar-mobile__link">
          <span>South</span>
          <span class="e-header__top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-header__top-bar-mobile__divider"></div>

      <!--USER-->
      <div class="e-header__top-bar-mobile__user">
        <div class="e-header__top-bar-mobile__title">Loged in as:</div>
        <div class="e-header__top-bar-mobile__user-menu">
          <div class="e-header__top-bar-mobile__user-menu-name">Ragna Nordmann (e55717@hafslund.no)</div>
          <div class="e-header__top-bar-mobile__user-menu-settings">
            <i class="e-icon e-icon--cog e-icon--xs"></i>
            Settings
          </div>
          <div class="e-header__top-bar-mobile__user-menu-logout">
            <i class="e-icon e-icon--logout e-icon--xs"></i>
            Log out
          </div>
        </div>
      </div>
    </div>

    <!--TOP MENU ~ DESKTOP-->
    <div class="e-header__top-bar-desktop">
      <div class="e-grid">
        <div class="row no-gutters">

          <!--LOGO + APP-->
          <div class="col-xs-2 col-sm-3 col-md-7 col-lg-8">
            <!--LOGO-->
            <div class="e-header__top-bar-desktop__logo">
              <img src="./../../../assets/logo/elvia_positive_4.svg" alt="Elvia Logo" />
            </div>
            <!--APP-->
            <div class="e-header__top-bar-desktop__app">
              <a class="e-header__top-bar-desktop__link">
                <span>Drops</span>
                <span class="e-header__top-bar-desktop__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-header__top-bar-desktop__app-menu">
                <div class="e-header__top-bar-desktop__app-menu-item e-header__top-bar-desktop__app-menu-item--active">
                  <div class="e-header__top-bar-desktop__app-circle">D</div>
                  <div class="e-header__top-bar-desktop__app-title">DROPS</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">O</div>
                  <div class="e-header__top-bar-desktop__app-title">ORBIT</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">J</div>
                  <div class="e-header__top-bar-desktop__app-title">JORDFEIL</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">D</div>
                  <div class="e-header__top-bar-desktop__app-title">DIKO</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">A</div>
                  <div class="e-header__top-bar-desktop__app-title">ADLS</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">S</div>
                  <div class="e-header__top-bar-desktop__app-title">SV</div>
                </div>
              </div>
            </div>

            <span class="e-header__top-bar-desktop__line e-mx-32"></span>

            <!--TITLE DESKTOP-->
            <div class="e-header__top-bar-desktop__title">
              Map and analysis
            </div>
          </div>

          <!--TITTLE-->
          <div class="col-xs-8 col-sm-6">
            <div class="e-header__top-bar-desktop__title">
              Map and analysis
            </div>
          </div>

          <!--AREA + USER-->
          <div class="col-sm-3 col-md-5 col-lg-4">
            <!--AREA-->
            <div class="e-header__top-bar-desktop__area">
              <a class="e-header__top-bar-desktop__link">
                <span>Elvia South</span>
                <span class="e-header__top-bar-desktop__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-header__top-bar-desktop__area-menu">
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia North</div>
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia South</div>
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia North and South</div>
              </div>
            </div>

            <span class="e-header__top-bar-desktop__line e-mx-24"></span>

            <!--USER-->
            <div class="e-header__top-bar-desktop__user">
              <a class="e-header__top-bar-desktop__link">
                <span><i class="e-icon e-icon--profile-bold e-icon--xs"></i></span>
                <span>Ragna Nordmann</span>
              </a>
              <div class="e-header__top-bar-desktop__user-menu">
                <div class="e-header__top-bar-desktop__user-menu-name">Ragna Nordmann</div>
                <div class="e-header__top-bar-desktop__user-menu-mail">e55717@hafslund.no</div>
                <div class="e-header__top-bar-desktop__user-menu-settings">
                  <i class="e-icon e-icon--cog e-icon--xs"></i>
                  Settings
                </div>
                <div class="e-header__top-bar-desktop__user-menu-logout">
                  <i class="e-icon e-icon--logout e-icon--xs"></i>
                  Log out
                </div>
              </div>
            </div>
          </div>

          <!--HAMBURGER-->
          <div class="col-xs-2 col-sm-3 col-md-3">
            <div class="e-header__top-bar-desktop__hamburger">
              <i class="e-icon e-icon--menu-bold"></i>
              <i class="e-icon e-icon--remove_circle-color"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--SIDE MENU-->
  <div class="e-header__sidebar">

    <!--APPS-->
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--dashboard"></i>
        <i class="e-icon e-icon--dashboard-color"></i>
      </span>
      <span class="e-header__sidebar__text">Overview</span>
    </div>
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--search"></i>
        <i class="e-icon e-icon--search-color"></i>
      </span>
      <span class="e-header__sidebar__text">Search</span>
    </div>
    <div class="e-header__sidebar__item e-header__sidebar__item--active">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--pin"></i>
        <i class="e-icon e-icon--pin-color"></i>
      </span>
      <span class="e-header__sidebar__text">Analysis</span>
    </div>
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--graph_bar"></i>
        <i class="e-icon e-icon--graph_bar-color"></i>
      </span>
      <span class="e-header__sidebar__text">Statistics</span>
    </div>

    <!--OPEN/CLOSE BTN-->
    <div class="e-header__sidebar__open-close">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--open_menu"></i>
        <i class="e-icon e-icon--close_menu"></i>
      </span>
      <span class="e-header__sidebar__text">Minimize</span>
    </div>
  </div>
</div>
`;

  internalHeaderOpen = `<div class="e-header e-header--open">
  <!--TOP MENU-->
  <div class="e-header__top-bar">

    <!--TOP MENU ~ MOBILE-->
    <div class="e-header__top-bar-mobile e-header__top-bar-mobile__app--open e-header__top-bar-mobile__area--open">

      <!--APP-->
      <div class="e-header__top-bar-mobile__app">
        <div class="e-header__top-bar-mobile__title">Applications</div>
        <a class="e-header__top-bar-mobile__link">
          <span>DROPS</span>
          <span class="e-header__top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-header__top-bar-mobile__divider"></div>

      <!--AREA-->
      <div class="e-header__top-bar-mobile__area">
        <div class="e-header__top-bar-mobile__title">Area</div>
        <a class="e-header__top-bar-mobile__link">
          <span>South</span>
          <span class="e-header__top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-header__top-bar-mobile__divider"></div>

      <!--USER-->
      <div class="e-header__top-bar-mobile__user">
        <div class="e-header__top-bar-mobile__title">Logged in as:</div>
        <div class="e-header__top-bar-mobile__user-menu">
          <div class="e-header__top-bar-mobile__user-menu-name">Ragna Nordmann (e55717@hafslund.no)</div>
          <div class="e-header__top-bar-mobile__user-menu-settings">
            <i class="e-icon e-icon--cog e-icon--xs"></i>
            Settings
          </div>
          <div class="e-header__top-bar-mobile__user-menu-logout">
            <i class="e-icon e-icon--logout e-icon--xs"></i>
            Log out
          </div>
        </div>
      </div>
    </div>

    <!--TOP MENU ~ DESKTOP-->
    <div class="e-header__top-bar-desktop e-header__top-bar-desktop__app--open e-header__top-bar-desktop__area--open e-header__top-bar-desktop__user--open">
      <div class="e-grid">
        <div class="row no-gutters">

          <!--LOGO + APP-->
          <div class="col-xs-2 col-sm-3 col-md-7 col-lg-8">
            <!--LOGO-->
            <div class="e-header__top-bar-desktop__logo">
              <img src="./../../../assets/logo/elvia_positive_4.svg" alt="Elvia Logo" />
            </div>
            <!--APP-->
            <div class="e-header__top-bar-desktop__app">
              <a class="e-header__top-bar-desktop__link">
                <span>Drops</span>
                <span class="e-header__top-bar-desktop__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-header__top-bar-desktop__app-menu">
                <div class="e-header__top-bar-desktop__app-menu-item e-header__top-bar-desktop__app-menu-item--active">
                  <div class="e-header__top-bar-desktop__app-circle">D</div>
                  <div class="e-header__top-bar-desktop__app-title">DROPS</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">O</div>
                  <div class="e-header__top-bar-desktop__app-title">ORBIT</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">J</div>
                  <div class="e-header__top-bar-desktop__app-title">JORDFEIL</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">D</div>
                  <div class="e-header__top-bar-desktop__app-title">DIKO</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">A</div>
                  <div class="e-header__top-bar-desktop__app-title">ADLS</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">S</div>
                  <div class="e-header__top-bar-desktop__app-title">SV</div>
                </div>
              </div>
            </div>

            <span class="e-header__top-bar-desktop__line e-mx-32"></span>

            <!--TITLE DESKTOP-->
            <div class="e-header__top-bar-desktop__title">
              Map and analysis
            </div>
          </div>

          <!--TITTLE-->
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
            <div class="e-header__top-bar-desktop__title">
              Map and analysis
            </div>
          </div>

          <!--AREA + USER-->
          <div class="col-sm-3 col-md-5 col-lg-4">
            <!--AREA-->
            <div class="e-header__top-bar-desktop__area">
              <a class="e-header__top-bar-desktop__link">
                <span>Elvia South</span>
                <span class="e-header__top-bar-desktop__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-header__top-bar-desktop__area-menu">
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia North</div>
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia South</div>
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia North and South</div>
              </div>
            </div>
            <span class="e-header__top-bar-desktop__line e-mx-24"></span>
            <!--USER-->
            <div class="e-header__top-bar-desktop__user">
              <a class="e-header__top-bar-desktop__link">
                <span><i class="e-icon e-icon--profile-bold e-icon--xs"></i></span>
                <span>Ragna Nordmann</span>
              </a>
              <div class="e-header__top-bar-desktop__user-menu">
                <div class="e-header__top-bar-desktop__user-menu-name">Ragna Nordmann</div>
                <div class="e-header__top-bar-desktop__user-menu-mail">e55717@hafslund.no</div>
                <div class="e-header__top-bar-desktop__user-menu-settings">
                  <i class="e-icon e-icon--cog e-icon--xs"></i>
                  Settings
                </div>
                <div class="e-header__top-bar-desktop__user-menu-logout">
                  <i class="e-icon e-icon--logout e-icon--xs"></i>
                  Log out
                </div>
              </div>
            </div>
          </div>

          <!--HAMBURGER-->
          <div class="col-xs-2 col-sm-3 col-md-3">
            <div class="e-header__top-bar-desktop__hamburger">
              <i class="e-icon e-icon--menu-bold"></i>
              <i class="e-icon e-icon--remove_circle-color"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--SIDE MENU-->
  <div class="e-header__sidebar">

    <!--APPS-->
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--dashboard"></i>
        <i class="e-icon e-icon--dashboard-color"></i>
      </span>
      <span class="e-header__sidebar__text">Overview</span>
    </div>
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--search"></i>
        <i class="e-icon e-icon--search-color"></i>
      </span>
      <span class="e-header__sidebar__text">Search</span>
    </div>
    <div class="e-header__sidebar__item e-header__sidebar__item--active">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--pin"></i>
        <i class="e-icon e-icon--pin-color"></i>
      </span>
      <span class="e-header__sidebar__text">Analysis</span>
    </div>
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--graph_bar"></i>
        <i class="e-icon e-icon--graph_bar-color"></i>
      </span>
      <span class="e-header__sidebar__text">Statistics</span>
    </div>

    <!--OPEN/CLOSE BTN-->
    <div class="e-header__sidebar__open-close">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--open_menu"></i>
        <i class="e-icon e-icon--close_menu"></i>
      </span>
      <span class="e-header__sidebar__text">Minimize</span>
    </div>
  </div>
</div>
`;

  internalHeaderSideOpen = `<div class="e-header">
  <!--TOP MENU-->
  <div class="e-header__top-bar">

    <!--TOP MENU ~ MOBILE-->
    <div class="e-header__top-bar-mobile">

      <!--APP-->
      <div class="e-header__top-bar-mobile__app">
        <div class="e-header__top-bar-mobile__title">Applications</div>
        <a class="e-header__top-bar-mobile__link">
          <span>DROPS</span>
          <span class="e-header__top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-header__top-bar-mobile__divider"></div>

      <!--AREA-->
      <div class="e-header__top-bar-mobile__area">
        <div class="e-header__top-bar-mobile__title">Area</div>
        <a class="e-header__top-bar-mobile__link">
          <span>South</span>
          <span class="e-header__top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-header__top-bar-mobile__divider"></div>

      <!--USER-->
      <div class="e-header__top-bar-mobile__user">
        <div class="e-header__top-bar-mobile__title">Logged in as:</div>
        <div class="e-header__top-bar-mobile__user-menu">
          <div class="e-header__top-bar-mobile__user-menu-name">Ragna Nordmann (e55717@hafslund.no)</div>
          <div class="e-header__top-bar-mobile__user-menu-settings">
            <i class="e-icon e-icon--cog e-icon--xs"></i>
            Settings
          </div>
          <div class="e-header__top-bar-mobile__user-menu-logout">
            <i class="e-icon e-icon--logout e-icon--xs"></i>
            Log out
          </div>
        </div>
      </div>
    </div>

    <!--TOP MENU ~ DESKTOP-->
    <div class="e-header__top-bar-desktop">
      <div class="e-grid">
        <div class="row no-gutters">

          <!--LOGO + APP-->
          <div class="col-xs-2 col-sm-3 col-md-7 col-lg-8">
            <!--LOGO-->
            <div class="e-header__top-bar-desktop__logo">
              <img src="./../../../assets/logo/elvia_positive_4.svg" alt="Elvia Logo" />
            </div>
            <!--APP-->
            <div class="e-header__top-bar-desktop__app">
              <a class="e-header__top-bar-desktop__link">
                <span>Drops</span>
                <span class="e-header__top-bar-desktop__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-header__top-bar-desktop__app-menu">
                <div class="e-header__top-bar-desktop__app-menu-item e-header__top-bar-desktop__app-menu-item--active">
                  <div class="e-header__top-bar-desktop__app-circle">D</div>
                  <div class="e-header__top-bar-desktop__app-title">DROPS</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">O</div>
                  <div class="e-header__top-bar-desktop__app-title">ORBIT</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">J</div>
                  <div class="e-header__top-bar-desktop__app-title">JORDFEIL</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">D</div>
                  <div class="e-header__top-bar-desktop__app-title">DIKO</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">A</div>
                  <div class="e-header__top-bar-desktop__app-title">ADLS</div>
                </div>
                <div class="e-header__top-bar-desktop__app-menu-item">
                  <div class="e-header__top-bar-desktop__app-circle">S</div>
                  <div class="e-header__top-bar-desktop__app-title">SV</div>
                </div>
              </div>
            </div>

            <span class="e-header__top-bar-desktop__line e-mx-32"></span>

            <!--TITLE DESKTOP-->
            <div class="e-header__top-bar-desktop__title">
              Map and analysis
            </div>
          </div>

          <!--TITTLE-->
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
            <div class="e-header__top-bar-desktop__title">
              Map and analysis
            </div>
          </div>

          <!--AREA + USER-->
          <div class="col-sm-3 col-md-5 col-lg-4">
            <!--AREA-->
            <div class="e-header__top-bar-desktop__area">
              <a class="e-header__top-bar-desktop__link">
                <span>Elvia South</span>
                <span class="e-header__top-bar-desktop__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-header__top-bar-desktop__area-menu">
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia North</div>
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia South</div>
                <div class="e-header__top-bar-desktop__area-menu-item">Elvia North and South</div>
              </div>
            </div>
            <span class="e-header__top-bar-desktop__line e-mx-24"></span>
            <!--USER-->
            <div class="e-header__top-bar-desktop__user">
              <a class="e-header__top-bar-desktop__link">
                <span><i class="e-icon e-icon--profile-bold e-icon--xs"></i></span>
                <span>Ragna Nordmann</span>
              </a>
              <div class="e-header__top-bar-desktop__user-menu">
                <div class="e-header__top-bar-desktop__user-menu-name">Ragna Nordmann</div>
                <div class="e-header__top-bar-desktop__user-menu-mail">e55717@hafslund.no</div>
                <div class="e-header__top-bar-desktop__user-menu-settings">
                  <i class="e-icon e-icon--cog e-icon--xs"></i>
                  Settings
                </div>
                <div class="e-header__top-bar-desktop__user-menu-logout">
                  <i class="e-icon e-icon--logout e-icon--xs"></i>
                  Log out
                </div>
              </div>
            </div>
          </div>

          <!--HAMBURGER-->
          <div class="col-xs-2 col-sm-3 col-md-3">
            <div class="e-header__top-bar-desktop__hamburger">
              <i class="e-icon e-icon--menu-bold"></i>
              <i class="e-icon e-icon--remove_circle-color"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--SIDE MENU-->
  <div class="e-header__sidebar e-header__sidebar--open">

    <!--APPS-->
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--dashboard"></i>
        <i class="e-icon e-icon--dashboard-color"></i>
      </span>
      <span class="e-header__sidebar__text">Overview</span>
    </div>
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--search"></i>
        <i class="e-icon e-icon--search-color"></i>
      </span>
      <span class="e-header__sidebar__text">Search</span>
    </div>
    <div class="e-header__sidebar__item e-header__sidebar__item--active">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--pin"></i>
        <i class="e-icon e-icon--pin-color"></i>
      </span>
      <span class="e-header__sidebar__text">Analysis</span>
    </div>
    <div class="e-header__sidebar__item">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--graph_bar"></i>
        <i class="e-icon e-icon--graph_bar-color"></i>
      </span>
      <span class="e-header__sidebar__text">Statistics</span>
    </div>

    <!--OPEN/CLOSE BTN-->
    <div class="e-header__sidebar__open-close">
      <span class="e-header__sidebar__icon">
        <i class="e-icon e-icon--open_menu"></i>
        <i class="e-icon e-icon--close_menu"></i>
      </span>
      <span class="e-header__sidebar__text">Minimize</span>
    </div>
  </div>
</div>
`;

  constructor(private globalService: GlobalService) {}

  testInternalHeader(): void {
    this.globalService.toggleShowInternalHeader(true);
    this.internalHeader = true;
  }
  hideInternalHeader(): void {
    this.globalService.toggleShowInternalHeader(false);
    this.internalHeader = false;
  }
}
