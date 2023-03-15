import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'nc-icon nc-bank'
},
{
    path: '/importacao',
    title: 'Importação',
    type: 'sub',
    collapse: 'importacao',
    icontype: 'nc-icon nc-world-2',
    children: [
        { path: 'novo-processo', title: 'Novo Processo', ab: 'NP' },
        { path: 'relatorios', title: 'Processos', ab: 'P' },
    ]
},
{
    path: '/configuracoes',
    title: 'Configurações',
    type: 'sub',
    collapse: 'configuracoes',
    icontype: 'nc-icon nc-settings-gear-65',
    children: [
        { path: 'empresa', title: 'Representante Legal', ab: 'R' },
        { path: 'associados', title: 'Empresas', ab: 'E' },
    ]
},


    // {
    //     path: '/components',
    //     title: 'Components',
    //     type: 'sub',
    //     collapse: 'components',
    //     icontype: 'nc-icon nc-layout-11',
    //     children: [
    //         { path: 'buttons', title: 'Buttons', ab: 'B' },
    //         { path: 'grid', title: 'Grid System', ab: 'GS' },
    //         { path: 'panels', title: 'Panels', ab: 'P' },
    //         { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
    //         { path: 'notifications', title: 'Notifications', ab: 'N' },
    //         { path: 'icons', title: 'Icons', ab: 'I' },
    //         { path: 'typography', title: 'Typography', ab: 'T' }
    //     ]
    // },

    // {
    //     path: '/forms',
    //     title: 'Forms',
    //     type: 'sub',
    //     collapse: 'forms',
    //     icontype: 'nc-icon nc-ruler-pencil',
    //     children: [
    //         { path: 'regular', title: 'Regular Forms', ab: 'RF' },
    //         { path: 'extended', title: 'Extended Forms', ab: 'EF' },
    //         { path: 'validation', title: 'Validation Forms', ab: 'VF' },
    //         { path: 'wizard', title: 'Wizard', ab: 'W' }
    //     ]
    // }, {
    //     path: '/tables',
    //     title: 'Tables',
    //     type: 'sub',
    //     collapse: 'tables',
    //     icontype: 'nc-icon nc-single-copy-04',
    //     children: [
    //         { path: 'regular', title: 'Regular Tables', ab: 'RT' },
    //         { path: 'extended', title: 'Extended Tables', ab: 'ET' },
    //         { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
    //     ]
    // }, {
    //     path: '/maps',
    //     title: 'Maps',
    //     type: 'sub',
    //     collapse: 'maps',
    //     icontype: 'nc-icon nc-pin-3',
    //     children: [
    //         { path: 'google', title: 'Google Maps', ab: 'GM' },
    //         { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
    //         { path: 'vector', title: 'Vector Map', ab: 'VM' }
    //     ]
    // }, {
    //     path: '/widgets',
    //     title: 'Widgets',
    //     type: 'link',
    //     icontype: 'nc-icon nc-box'

    // }, {
    //     path: '/charts',
    //     title: 'Charts',
    //     type: 'link',
    //     icontype: 'nc-icon nc-chart-bar-32'

    // }, {
    //     path: '/calendar',
    //     title: 'Calendar',
    //     type: 'link',
    //     icontype: 'nc-icon nc-calendar-60'
    // }, {
    //     path: '/pages',
    //     title: 'Pages',
    //     collapse: 'pages',
    //     type: 'sub',
    //     icontype: 'nc-icon nc-book-bookmark',
    //     children: [
    //         { path: 'timeline', title: 'Timeline Page', ab: 'T' },
    //         { path: 'user', title: 'User Page', ab: 'UP' },
    //         { path: 'login', title: 'Login Page', ab: 'LP' },
    //         { path: 'register', title: 'Register Page', ab: 'RP' },
    //         { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' }
    //     ]
    // }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {

    public codeEmpresa: number = 0;
    public user: IUser;
    public nomeuser: string = "";
    public nomeempresa: string = "";
    public step: string = "";

    constructor(
        private authservice: AuthService
    ) {

    }

    onSelectStep(item) {
        this.step = item;
    }

    onClearStep() {
        this.step = "";
    }

    public menuItems: any[];
    isNotMobileMenu() {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.user = this.authservice.CurrentUser;
        this.user.name.length > 15 ? this.nomeuser = this.user.name.substring(0, 15) : this.nomeuser = this.user.name
        this.nomeempresa = this.user.empresa.nomeFantasia;

        this.codeEmpresa = this.authservice.CurrentUser.idEmpresa;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    ngAfterViewInit() {
    }
}
