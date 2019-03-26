    ;(function($) {
        var app = $.sammy('#main', function() {

            var ceny=[
/*cena_pochodnia:*/         75,
/*cena_jedzenie:*/          75,
/*cena_lopata:*/            250,
/*cena_woda_swiecona:*/     150,
/*cena_wytrych:*/           200,
/*cena_ziola_medyczne:*/    200,
/*cena_odrutka:*/           150,
/*cena_bandaz:*/            150
            ];

/*Poniższa tablica 8x24 zawiera zestaw rozwiązań. 
Ilość danych elementów (8 elementów) zabieranych  na jedną z 12 misji dla 2 pomysłów konfiguracji (24=12x2)
Skrót po lewej stronie o nowiasów oznacza np.:r_k_s - Ruiny_Krotka_Standardowy
*/
            var ekwp=[
/*r_k_s*/[8,12,2,2,1,1,0,1],/*Ruiny_Krotka_Standardowy*/
/*r_k_n*/[0,16,2,2,2,0,0,0],
/*r_s_s*/[13,18,3,3,2,2,0,2],
/*r_s_n*/[0,22,3,3,2,0,0,0],
/*r_d_s*/[16,20,4,4,3,3,0,3],
/*r_d_n*/[0,24,4,4,3,0,0,0],
/*n_k_s*/[10,12,2,2,2,3,0,1],
/*n_k_n*/[0,16,2,2,2,3,0,0],
/*n_s_s*/[16,18,3,3,3,4,1,2],
/*n_s_n*/[0,22,3,3,3,4,0,0],
/*n_d_s*/[20,20,4,4,3,5,1,3],
/*n_d_n*/[0,24,4,4,3,4,0,0],
/*k_k_s*/[8,12,3,1,1,1,2,2],
/*k_k_n*/[0,16,3,2,2,0,2,1],
/*k_s_s*/[13,18,5,2,2,2,3,3],
/*k_s_n*/[0,22,5,3,2,0,3,1],
/*k_d_s*/[16,20,6,3,2,2,4,4],
/*k_d_n*/[0,24,6,3,2,1,4,0],
/*z_k_s*/[8,12,3,0,1,2,0,2],
/*z_k_n*/[0,16,3,1,1,2,0,0],
/*z_s_s*/[13,18,5,2,2,3,0,4],
/*z_s_n*/[0,24,5,2,2,3,0,0],
/*z_d_s*/[16,20,6,1,3,4,0,6],
/*z_d_n*/[0,24,6,2,3,4,0,0]
                ];

//tytuły podstron
            var tytuly = [
            ["Ruiny","Norowisko","Knieja","Zatoka"],
            ["Krótka","Średnia","Długa"],
            ["Standardowy","Niebezpieczny"]
            ];


//wyliczenie numeru nazwy strony z danej kategorii na podstawie numeru mapy
            function myFunction(nr_mapy){
			var x,y,z;

			//3*2*z+2*y+x=nr_mapy;
			x=nr_mapy%2;
			z=Math.floor(nr_mapy/6);
			y=(nr_mapy-6*z-x)/2;
			return [z,y,x];
			}





//poniższa funkcja wylicza koszt zakupu całych zapasów wymnażając kolejno cenę artykułu przez ilość oraz dodając do pozostałego kosztu
            function licz_koszt(mapa) {
                  var cena=0;
                  var i;
                  for(i=0;i<8;i++){
                    cena=cena+ceny[i] * ekwp[mapa][i]; 
                  }   
                  return cena;         
            }



            function przypisz(mapa,caly_koszt) {
                
//przepisanie obliczone ceny całości zapasów
                $("#ck").data("nazwa_t", caly_koszt);//Attach data to #ck element
                $("#ck").text($("#ck").data("nazwa_t"));//Get data attached to #ck element
                /* 
                data - metoda załadująca dane 
                #ck nr1 - miejscce przypisania;nazwa_t n1 - nazwa obiektu, do którego sie odnoszę;
                cały_koszt - tabela [8x24]
                #ck nr2 - nazwa elementu DOM do którego się odnosimy w celu zmany jego danych
                #ck nr3 - nazwa elementu DOM z którego pobieramy dane
                nazwa_t nr2 - nazwa  obiektu, do którego sie odnoszę w celu wywołanie jego wartości do zapisanie na elemencie DOM
                */

//przepisanie tabeli wartości pojedynczych produktów do widoku
                $("body").data("nazwa_1_t", ceny);
                $("#cena_pochodnia").text($("body").data("nazwa_1_t")[0]);
                $("#cena_jedzenie").text($("body").data("nazwa_1_t")[1]);
                $("#cena_lopata").text($("body").data("nazwa_1_t")[2]);
                $("#cena_woda_swiecona").text($("body").data("nazwa_1_t")[3]);
                $("#cena_wytrych").text($("body").data("nazwa_1_t")[4]);
                $("#cena_ziola_medyczne").text($("body").data("nazwa_1_t")[5]);
                $("#cena_odrutka").text($("body").data("nazwa_1_t")[6]);
                $("#cena_bandaz").text($("body").data("nazwa_1_t")[7]);


//przepisanie wartości  tabeli ilości ekwipunku do widoku
                $("body").data("nazwa_2_t", ekwp);
                $("#ekw_pochodnia").text($("body").data("nazwa_2_t")[mapa][0]);
                $("#ekw_jedzenie").text($("body").data("nazwa_2_t")[mapa][1]);
                $("#ekw_lopata").text($("body").data("nazwa_2_t")[mapa][2]);
                $("#ekw_woda_swiecona").text($("body").data("nazwa_2_t")[mapa][3]);
                $("#ekw_wytrych").text($("body").data("nazwa_2_t")[mapa][4]);
                $("#ekw_ziola_medyczne").text($("body").data("nazwa_2_t")[mapa][5]);
                $("#ekw_odrutka").text($("body").data("nazwa_2_t")[mapa][6]);
                $("#ekw_bandaz").text($("body").data("nazwa_2_t")[mapa][7]);


                [m,l,k]=myFunction(mapa);//obliczenie numerów strony z danej kategorii

//przepisanie nazwa danej solucji do widoku
                $("body").data("nazwa_3_t", tytuly);
                $("#typ_mapy").text($("body").data("nazwa_3_t")[0][m]);
                $("#how_long").text($("body").data("nazwa_3_t")[1][l]);
                $("#typ_porad").text($("body").data("nazwa_3_t")[2][k]);
            }

/*********************************************************************/
//strona START controller
            this.get('#/', function() {
              this.partial('START/START.htm');
            });
/*********************************************************************/

/*********************************************************************/
//strona Ruiny_Krotka_Standardowy controller
            this.get('#/Ruiny_Krotka_Standardowy', function() {
              this.partial('Ruiny/Ruiny.htm',function() {
                var mapa=0;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Ruiny_Krotka_Niebezpieczny controller
            this.get('#/Ruiny_Krotka_Niebezpieczny', function() {
              this.partial('Ruiny/Ruiny.htm',function() {
                var mapa=1;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Ruiny_Srednia_Standardowy controller
            this.get('#/Ruiny_Srednia_Standardowy', function() {
              this.partial('Ruiny/Ruiny.htm',function() {
                var mapa=2;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Ruiny_Srednia_Niebezpieczny controller
            this.get('#/Ruiny_Srednia_Niebezpieczny', function() {
              this.partial('Ruiny/Ruiny.htm',function() {
                var mapa=3;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Ruiny_Dluga_Standardowy controller
            this.get('#/Ruiny_Dluga_Standardowy', function() {
              this.partial('Ruiny/Ruiny.htm',function() {
                var mapa=4;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Ruiny_Dluga_Niebezpieczny controller
            this.get('#/Ruiny_Dluga_Niebezpieczny', function() {
              this.partial('Ruiny/Ruiny.htm',function() {
                var mapa=5;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/



/*********************************************************************/
//strona Norowisko_Krotka_Standardowy controller
            this.get('#/Norowisko_Krotka_Standardowy', function() {
              this.partial('Norowisko/Norowisko.htm',function() {
                var mapa=6;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Norowisko_Krotka_Niebezpieczny controller
            this.get('#/Norowisko_Krotka_Niebezpieczny', function() {
              this.partial('Norowisko/Norowisko.htm',function() {
                var mapa=7;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Norowisko_Srednia_Standardowy controller
            this.get('#/Norowisko_Srednia_Standardowy', function() {
              this.partial('Norowisko/Norowisko.htm',function() {
                var mapa=8;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Norowisko_Srednia_Niebezpieczny controller
            this.get('#/Norowisko_Srednia_Niebezpieczny', function() {
              this.partial('Norowisko/Norowisko.htm',function() {
                var mapa=9;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Norowisko_Dluga_Standardowy controller
            this.get('#/Norowisko_Dluga_Standardowy', function() {
              this.partial('Norowisko/Norowisko.htm',function() {
                var mapa=10;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Norowisko_Dluga_Niebezpieczny controller
            this.get('#/Norowisko_Dluga_Niebezpieczny', function() {
              this.partial('Norowisko/Norowisko.htm',function() {
                var mapa=11;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/



/*********************************************************************/
//strona Knieja_Krotka_Standardowy controller
            this.get('#/Knieja_Krotka_Standardowy', function() {
              this.partial('Knieja/Knieja.htm',function() {
                var mapa=12;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Knieja_Krotka_Niebezpieczny controller
            this.get('#/Knieja_Krotka_Niebezpieczny', function() {
              this.partial('Knieja/Knieja.htm',function() {
                var mapa=13;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Knieja_Srednia_Standardowy controller
            this.get('#/Knieja_Srednia_Standardowy', function() {
              this.partial('Knieja/Knieja.htm',function() {
                var mapa=14;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Knieja_Srednia_Niebezpieczny controller
            this.get('#/Knieja_Srednia_Niebezpieczny', function() {
              this.partial('Knieja/Knieja.htm',function() {
                var mapa=15;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Knieja_Dluga_Standardowy controller
            this.get('#/Knieja_Dluga_Standardowy', function() {
              this.partial('Knieja/Knieja.htm',function() {
                var mapa=16;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Knieja_Dluga_Niebezpieczny controller
            this.get('#/Knieja_Dluga_Niebezpieczny', function() {
              this.partial('Knieja/Knieja.htm',function() {
                var mapa=17;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/



/*********************************************************************/
//strona Zatoka_Krotka_Standardowy controller
            this.get('#/Zatoka_Krotka_Standardowy', function() {
              this.partial('Zatoka/Zatoka.htm',function() {
                var mapa=18;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Zatoka_Krotka_Niebezpieczny controller
            this.get('#/Zatoka_Krotka_Niebezpieczny', function() {
              this.partial('Zatoka/Zatoka.htm',function() {
                var mapa=19;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Zatoka_Srednia_Standardowy controller
            this.get('#/Zatoka_Srednia_Standardowy', function() {
              this.partial('Zatoka/Zatoka.htm',function() {
                var mapa=20;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Zatoka_Srednia_Niebezpieczny controller
            this.get('#/Zatoka_Srednia_Niebezpieczny', function() {
              this.partial('Zatoka/Zatoka.htm',function() {
                var mapa=21;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Zatoka_Dluga_Standardowy controller
            this.get('#/Zatoka_Dluga_Standardowy', function() {
              this.partial('Zatoka/Zatoka.htm',function() {
                var mapa=22;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/

/*********************************************************************/
//strona Zatoka_Dluga_Niebezpieczny controller
            this.get('#/Zatoka_Dluga_Niebezpieczny', function() {
              this.partial('Zatoka/Zatoka.htm',function() {
                var mapa=23;
                var c_k = licz_koszt(mapa);
                przypisz(mapa,c_k);
              });
            });
/*********************************************************************/



        });

      $(function() {
        app.run('#/');
      });

    })(jQuery);
