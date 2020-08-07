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
  figmaUrl = getComponent('header-doc').figmaUrl;

  internalHeaderOpen = `<div class="e-header e-header--open">
  <!--TOP MENU-->
  <div class="e-top-bar">

    <!--TOP MENU ~ MOBILE-->
    <div class="e-top-bar-mobile e-top-bar-mobile__app--open e-top-bar-mobile__area--open">

      <!--APP-->
      <div class="e-top-bar-mobile__app">
        <div class="e-top-bar-mobile__title">Applikasjon</div>
        <a class="e-top-bar-mobile__link">
          <span>DROPS</span>
          <span class="e-top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-top-bar-mobile__divider"></div>

      <!--AREA-->
      <div class="e-top-bar-mobile__area">
        <div class="e-top-bar-mobile__title">Område</div>
        <a class="e-top-bar-mobile__link">
          <span>Sør</span>
          <span class="e-top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-top-bar-mobile__divider"></div>

      <!--USER-->
      <div class="e-top-bar-mobile__user">
        <div class="e-top-bar-mobile__title">Innlogget som:</div>
        <div class="e-top-bar-mobile__user-menu">
          <div class="e-top-bar-mobile__user-menu-name">Ragna Nordmann (e55717@hafslund.no)</div>
          <div class="e-top-bar-mobile__user-menu-settings">
            <i class="e-icon e-icon--cog e-icon--xs"></i>
            Instillinger
          </div>
          <div class="e-top-bar-mobile__user-menu-logout">
            <i class="e-icon e-icon--logout e-icon--xs"></i>
            Logg ut
          </div>
        </div>
      </div>
    </div>

    <!--TOP MENU ~ DESKTOP-->
    <div class="e-top-bar-desktop e-top-bar__app--open e-top-bar__area--open e-top-bar__user--open">
      <div class="e-grid">
        <div class="row no-gutters">

          <!--LOGO + APP-->
          <div class="col-xs-2 col-sm-3 col-md-3 col-lg-4">
            <!--LOGO-->
            <div class="e-top-bar__logo">
              <img src="./../../../assets/logo/elvia_positive_4.svg" alt="Elvia Logo" />
            </div>
            <!--APP-->
            <div class="e-top-bar__app">
              <a class="e-top-bar__link">
                <span>Drops</span>
                <span class="e-top-bar__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-top-bar__app-menu">
                <div class="e-top-bar__app-menu-item e-top-bar__app-menu-item--active">
                  <div class="e-top-bar__app-circle">D</div>
                  <div class="e-top-bar__app-title">DROPS</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">O</div>
                  <div class="e-top-bar__app-title">ORBIT</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">J</div>
                  <div class="e-top-bar__app-title">JORDFEIL</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">D</div>
                  <div class="e-top-bar__app-title">DIKO</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">A</div>
                  <div class="e-top-bar__app-title">ADLS</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">S</div>
                  <div class="e-top-bar__app-title">SV</div>
                </div>
              </div>
            </div>
          </div>

          <!--TITTLE-->
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
            <div class="e-top-bar__title">
              Kart og analyse
            </div>
          </div>

          <!--AREA + USER-->
          <div class="col-sm-3 col-md-5 col-lg-4">
            <!--AREA-->
            <div class="e-top-bar__area">
              <a class="e-top-bar__link">
                <span>Elvia Sør</span>
                <span class="e-top-bar__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-top-bar__area-menu">
                <div class="e-top-bar__area-menu-item">Elvia Nord</div>
                <div class="e-top-bar__area-menu-item">Elvia Sør</div>
                <div class="e-top-bar__area-menu-item">Elvia Nord og Sør</div>
              </div>
            </div>
            <span class="e-top-bar__line e-mx-24"></span>
            <!--USER-->
            <div class="e-top-bar__user">
              <a class="e-top-bar__link">
                <span><i class="e-icon e-icon--profile-bold e-icon--xs"></i></span>
                <span>Ragna Nordmann</span>
              </a>
              <div class="e-top-bar__user-menu">
                <div class="e-top-bar__user-menu-name">Ragna Nordmann</div>
                <div class="e-top-bar__user-menu-mail">e55717@hafslund.no</div>
                <div class="e-top-bar__user-menu-settings">
                  <i class="e-icon e-icon--cog e-icon--xs"></i>
                  Instillinger
                </div>
                <div class="e-top-bar__user-menu-logout">
                  <i class="e-icon e-icon--logout e-icon--xs"></i>
                  Logg ut
                </div>
              </div>
            </div>
          </div>

          <!--HAMBURGER-->
          <div class="col-xs-2 col-sm-3 col-md-3">
            <div class="e-top-bar__hamburger">
              <i class="e-icon e-icon--menu-bold"></i>
              <i class="e-icon e-icon--remove_circle-color"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--SIDE MENU-->
  <div class="e-sidebar">

    <!--APPS-->
    <div class="e-sidebar__item">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--dashboard"></i>
        <i class="e-icon e-icon--dashboard-color"></i>
      </span>
      <span class="e-sidebar__text">Oversikt</span>
    </div>
    <div class="e-sidebar__item">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--search"></i>
        <i class="e-icon e-icon--search-color"></i>
      </span>
      <span class="e-sidebar__text">Målepunksøk</span>
    </div>
    <div class="e-sidebar__item e-sidebar__item--active">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--pin"></i>
        <i class="e-icon e-icon--pin-color"></i>
      </span>
      <span class="e-sidebar__text">Analyse</span>
    </div>
    <div class="e-sidebar__item">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--graph_bar"></i>
        <i class="e-icon e-icon--graph_bar-color"></i>
      </span>
      <span class="e-sidebar__text">Statistikk</span>
    </div>

    <!--OPEN/CLOSE BTN-->
    <div class="e-sidebar__open-close">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--open_menu"></i>
        <i class="e-icon e-icon--close_menu"></i>
      </span>
      <span class="e-sidebar__text">Minimer</span>
    </div>
  </div>
</div>
`;

  internalHeaderSideOpen = `<div class="e-header">
  <!--TOP MENU-->
  <div class="e-top-bar">

    <!--TOP MENU ~ MOBILE-->
    <div class="e-top-bar-mobile">

      <!--APP-->
      <div class="e-top-bar-mobile__app">
        <div class="e-top-bar-mobile__title">Applikasjon</div>
        <a class="e-top-bar-mobile__link">
          <span>DROPS</span>
          <span class="e-top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-top-bar-mobile__divider"></div>

      <!--AREA-->
      <div class="e-top-bar-mobile__area">
        <div class="e-top-bar-mobile__title">Område</div>
        <a class="e-top-bar-mobile__link">
          <span>Sør</span>
          <span class="e-top-bar-mobile__link-icon">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <i class="e-icon e-icon--arrow_up-bold"></i>
          </span>
        </a>
      </div>
      <div class="e-top-bar-mobile__divider"></div>

      <!--USER-->
      <div class="e-top-bar-mobile__user">
        <div class="e-top-bar-mobile__title">Innlogget som:</div>
        <div class="e-top-bar-mobile__user-menu">
          <div class="e-top-bar-mobile__user-menu-name">Ragna Nordmann (e55717@hafslund.no)</div>
          <div class="e-top-bar-mobile__user-menu-settings">
            <i class="e-icon e-icon--cog e-icon--xs"></i>
            Instillinger
          </div>
          <div class="e-top-bar-mobile__user-menu-logout">
            <i class="e-icon e-icon--logout e-icon--xs"></i>
            Logg ut
          </div>
        </div>
      </div>
    </div>

    <!--TOP MENU ~ DESKTOP-->
    <div class="e-top-bar-desktop">
      <div class="e-grid">
        <div class="row no-gutters">

          <!--LOGO + APP-->
          <div class="col-xs-2 col-sm-3 col-md-3 col-lg-4">
            <!--LOGO-->
            <div class="e-top-bar__logo">
              <img src="./../../../assets/logo/elvia_positive_4.svg" alt="Elvia Logo" />
            </div>
            <!--APP-->
            <div class="e-top-bar__app">
              <a class="e-top-bar__link">
                <span>Drops</span>
                <span class="e-top-bar__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-top-bar__app-menu">
                <div class="e-top-bar__app-menu-item e-top-bar__app-menu-item--active">
                  <div class="e-top-bar__app-circle">D</div>
                  <div class="e-top-bar__app-title">DROPS</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">O</div>
                  <div class="e-top-bar__app-title">ORBIT</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">J</div>
                  <div class="e-top-bar__app-title">JORDFEIL</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">D</div>
                  <div class="e-top-bar__app-title">DIKO</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">A</div>
                  <div class="e-top-bar__app-title">ADLS</div>
                </div>
                <div class="e-top-bar__app-menu-item">
                  <div class="e-top-bar__app-circle">S</div>
                  <div class="e-top-bar__app-title">SV</div>
                </div>
              </div>
            </div>
          </div>

          <!--TITTLE-->
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4">
            <div class="e-top-bar__title">
              Kart og analyse
            </div>
          </div>

          <!--AREA + USER-->
          <div class="col-sm-3 col-md-5 col-lg-4">
            <!--AREA-->
            <div class="e-top-bar__area">
              <a class="e-top-bar__link">
                <span>Elvia Sør</span>
                <span class="e-top-bar__link-icon">
                  <i class="e-icon e-icon--arrow_down-bold"></i>
                  <i class="e-icon e-icon--arrow_up-bold"></i>
                </span>
              </a>
              <div class="e-top-bar__area-menu">
                <div class="e-top-bar__area-menu-item">Elvia Nord</div>
                <div class="e-top-bar__area-menu-item">Elvia Sør</div>
                <div class="e-top-bar__area-menu-item">Elvia Nord og Sør</div>
              </div>
            </div>
            <span class="e-top-bar__line e-mx-24"></span>
            <!--USER-->
            <div class="e-top-bar__user">
              <a class="e-top-bar__link">
                <span><i class="e-icon e-icon--profile-bold e-icon--xs"></i></span>
                <span>Ragna Nordmann</span>
              </a>
              <div class="e-top-bar__user-menu">
                <div class="e-top-bar__user-menu-name">Ragna Nordmann</div>
                <div class="e-top-bar__user-menu-mail">e55717@hafslund.no</div>
                <div class="e-top-bar__user-menu-settings">
                  <i class="e-icon e-icon--cog e-icon--xs"></i>
                  Instillinger
                </div>
                <div class="e-top-bar__user-menu-logout">
                  <i class="e-icon e-icon--logout e-icon--xs"></i>
                  Logg ut
                </div>
              </div>
            </div>
          </div>

          <!--HAMBURGER-->
          <div class="col-xs-2 col-sm-3 col-md-3">
            <div class="e-top-bar__hamburger">
              <i class="e-icon e-icon--menu-bold"></i>
              <i class="e-icon e-icon--remove_circle-color"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--SIDE MENU-->
  <div class="e-sidebar e-sidebar--open">

    <!--APPS-->
    <div class="e-sidebar__item">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--dashboard"></i>
        <i class="e-icon e-icon--dashboard-color"></i>
      </span>
      <span class="e-sidebar__text">Oversikt</span>
    </div>
    <div class="e-sidebar__item">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--search"></i>
        <i class="e-icon e-icon--search-color"></i>
      </span>
      <span class="e-sidebar__text">Målepunksøk</span>
    </div>
    <div class="e-sidebar__item e-sidebar__item--active">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--pin"></i>
        <i class="e-icon e-icon--pin-color"></i>
      </span>
      <span class="e-sidebar__text">Analyse</span>
    </div>
    <div class="e-sidebar__item">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--graph_bar"></i>
        <i class="e-icon e-icon--graph_bar-color"></i>
      </span>
      <span class="e-sidebar__text">Statistikk</span>
    </div>

    <!--OPEN/CLOSE BTN-->
    <div class="e-sidebar__open-close">
      <span class="e-sidebar__icon">
        <i class="e-icon e-icon--open_menu"></i>
        <i class="e-icon e-icon--close_menu"></i>
      </span>
      <span class="e-sidebar__text">Minimer</span>
    </div>
  </div>
</div>
`;

  constructor(private globalService: GlobalService) { }

  testInternalHeader(): void {
    this.globalService.toggleShowInternalHeader(true);
    this.internalHeader = true;
  }
  hideInternalHeader(): void {
    this.globalService.toggleShowInternalHeader(false);
    this.internalHeader = false;
  }
}
