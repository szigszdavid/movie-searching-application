from seleniumbase import BaseCase

class HomeTest(BaseCase):
    def test_home_page(self):
        self.open("http://localhost:5173/")

        # Annak ellenőrzése, hogy a táblázat betöltött-e
        self.assert_text("Cím", '//*[@id="root"]/table/thead/tr/th[1]')
        
        searchButton = self.find_element('//*[@id="searchButton"]')
        
        # Annak ellenőrzése, hogy a Keresés gomb megjelenik
        self.assert_equal(searchButton.text, "Keresés")


        tableRows = self.find_elements('//*[@id="root"]/table/tbody/tr')

        # Annak ellenőrzése, hogy kezdetben 20 film töltődik be
        self.assert_equal(len(tableRows), 20)

    def test_search(self):
        self.open("http://localhost:5173/")

        # Annak ellenőrzése, hogy a táblázat betöltött-e
        self.assert_text("Cím", '//*[@id="root"]/table/thead/tr/th[1]')

        # Input kitöltése Star Wars: Episode III - Revenge of the Sith
        self.type('//*[@id="root"]/div/div[1]/input', "Star Wars: Episode III - Revenge of the Sith")

        # Keresésre klikkelés
        self.click('//*[@id="searchButton"]')

        # Annak az ellenőrzése, hogy az első elem a Star Wars: Episode III - Revenge of the Sith, a megjelenési év 2005 és az értékelése 7.411
        self.assert_text('Star Wars: Episode III - Revenge of the Sith', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2005', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7.411', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

    def test_details(self):
        self.open("http://localhost:5173/")

        # Annak ellenőrzése, hogy a táblázat betöltött-e
        self.assert_text("Cím", '//*[@id="root"]/table/thead/tr/th[1]')

        # Input kitöltése Star Wars: Episode III - Revenge of the Sith
        self.type('//*[@id="root"]/div/div[1]/input', "Star Wars: Episode III - Revenge of the Sith")

        # Keresésre klikkelés
        self.click('//*[@id="searchButton"]')

        # Annak az ellenőrzése, hogy az első elem a Star Wars: Episode III - Revenge of the Sith
        self.assert_text('Star Wars: Episode III - Revenge of the Sith', '//*[@id="root"]/table/tbody/tr[1]/td[1]')

        # Film címére klikkelés
        self.click('//*[@id="root"]/table/tbody/tr[1]/td[1]')


        # Dialógus ablakon a cím ellenőrzése
        self.assert_text("Star Wars: Episode III - Revenge of the Sith", '//*[@id="root"]/div[2]/h2')

        # Dialógus ablakon a leírás ellenőrzése
        self.assert_text_visible("Leírás", '//*[@id="root"]/div[2]/div/div[1]/div/div[1]/p')
        self.assert_text("The evil Darth Sidious enacts his final plan for unlimited power -- and the heroic Jedi Anakin Skywalker must choose a side.", '//*[@id="root"]/div[2]/div/div[1]/div/div[1]/div')

        # Dialógus ablakon annak az ellenőrzése, hogy Ewan McGregor a szereplők között van-e
        self.assert_true("Ewan McGregor" in self.find_element('//*[@id="root"]/div[2]/div/div[1]/div/div[2]/div').text)

        # Dialógus ablakon annak az ellenőrzése, hogy George Lucas a rendezők között szerepel-e
        self.assert_true("George Lucas" in self.find_element('//*[@id="root"]/div[2]/div/div[1]/div/div[3]/div').text )

        # Dialógus ablakon az első értékelés szerzőjének és a dátumnak az ellenőrzése
        self.assert_text('NeoBrowser', '//*[@id="root"]/div[2]/div/div[2]/div[1]/div[1]/div[1]')
        self.assert_text('2021-06-23T15:57:21.794Z', '//*[@id="root"]/div[2]/div/div[2]/div[1]/div[1]/div[2]')

        # Dialógus ablak bezárása
        self.click('//*[@id="root"]/div[2]/button')

        # Annak ellenőrzése, hogy a dialógus ablak már nem látható
        self.assert_false(self.is_text_visible('Bezárás'))

    
    def test_pagination(self):
        self.open("http://localhost:5173/")

        # Annak ellenőrzése, hogy a táblázat betöltött-e
        self.assert_text("Cím", '//*[@id="root"]/table/thead/tr/th[1]')

        # Input kitöltése Star Wars: Episode III - Revenge of the Sith
        self.type('//*[@id="root"]/div/div[1]/input', "Star Wars")

        # Keresésre klikkelés
        self.click('//*[@id="searchButton"]')

        # Annak az ellenőrzése, hogy az első elem a Star Wars, a megjelenési év 1977 és az értékelése 8.204
        self.assert_text('Star Wars', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('1977', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('8.204', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # Legörgetés a lap aljára
        self.scroll_to_bottom()

        # A második oldal betöltése
        self.click('//*[@id="root"]/button[2]')

        # Annak az ellenőrzése, hogy az első elem a Star Wars, a megjelenési év 1977 és az értékelése 8.204
        self.assert_text('Star Wars Rebels: Spark of Rebellion', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2014', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7.121', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

    def test_ordering_release_year(self):
        self.open("http://localhost:5173/")

        # A Megjelenési év oszlop tartalmának ellenőrzése, az első film a Meg 2
        self.assert_text('Megjelenési év', '//*[@id="root"]/table/thead/tr/th[2]')
        self.assert_text('Meg 2: The Trench', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2023', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # A Megjelenési év oszlopra kattintás
        self.click('//*[@id="root"]/table/thead/tr/th[2]')

        # A szövege az oszlopnak megváltozik, az új első film a Passage of Venus
        self.assert_true('⬆' in self.get_text('//*[@id="root"]/table/thead/tr/th[2]'))
        self.assert_text('Passage of Venus', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('1874', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('6.2', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # A Megjelenési év oszlopra kattintás
        self.click('//*[@id="root"]/table/thead/tr/th[2]')

        # A szövege az oszlopnak megváltozik, az új első film a Passage of Venus
        self.assert_true('⬇' in self.get_text('//*[@id="root"]/table/thead/tr/th[2]'))
        self.assert_text('Avatar 5', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2031', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('0', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

    def test_ordering_votes(self):
        self.open("http://localhost:5173/")

        # A Megjelenési év oszlop tartalmának ellenőrzése, az első film a Meg 2
        self.assert_text('Megjelenési év', '//*[@id="root"]/table/thead/tr/th[2]')
        self.assert_text('Meg 2: The Trench', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2023', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # A Megjelenési év oszlopra kattintás
        self.click('//*[@id="root"]/table/thead/tr/th[3]')

        # A szövege az oszlopnak megváltozik, az új első film a Passage of Venus
        self.assert_true('⬆' in self.get_text('//*[@id="root"]/table/thead/tr/th[3]'))
        self.assert_text('Copy Romance', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('0', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # A Megjelenési év oszlopra kattintás
        self.click('//*[@id="root"]/table/thead/tr/th[3]')

        # A szövege az oszlopnak megváltozik, az új első film a Passage of Venus
        self.assert_true('⬇' in self.get_text('//*[@id="root"]/table/thead/tr/th[3]'))
        self.assert_text('Inception', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2010', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('8.4', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

    def test_filter(self):
        self.open("http://localhost:5173/")

        # Az első film a szűrés előtt a Meg 2
        self.assert_text('Meg 2: The Trench', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2023', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # A Szűrés gombra klikkelés
        self.click('//*[@id="root"]/div/div[2]/button')

        # Megjelennek az opciók
        self.is_element_visible('//*[@id="root"]/div/div[2]/div')

        # Comedy és Animation kiválasztása
        self.check_if_unchecked('//*[@id="root"]/div/div[2]/div/div/label[3]/input')
        self.check_if_unchecked('//*[@id="root"]/div/div[2]/div/div/label[4]/input')

        # Annak az ellenőrzése, hogy a két checkbox ki van választva
        self.is_checked('//*[@id="root"]/div/div[2]/div/div/label[3]/input')
        self.is_checked('//*[@id="root"]/div/div[2]/div/div/label[4]/input')

        # Annak az ellenőrzése, hogy az Elemental az első a listában
        self.assert_text('Elemental', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2023', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7.8', '//*[@id="root"]/table/tbody/tr[1]/td[3]')

        # A Szűrések törlésére kattintás
        self.click('//*[@id="root"]/div/div[2]/div/button')

        # Annak az ellenőrzése, hogy újra a Meg 2 az első film
        self.assert_text('Meg 2: The Trench', '//*[@id="root"]/table/tbody/tr[1]/td[1]')
        self.assert_text('2023', '//*[@id="root"]/table/tbody/tr[1]/td[2]')
        self.assert_text('7', '//*[@id="root"]/table/tbody/tr[1]/td[3]')