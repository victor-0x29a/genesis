import os 
tentativas = []
nomes = ['Aleksandra ', 'Aleena ', 'Akiva ', 'Aharon ', 'Adora ', 'Adolph ', 'Zavier ', 'Zacary ', 'Yehudis ', 'Yashica ', 'Vicent ', 'Vianey ', 'Vernice ', 'Truong ', 'Tri ', 'Torre ', 'Tocarra ', 'Tobie ', 'Tino ', 'Tijuana ', 'Terrick ', 'Terrelle ', 'Teron ', 'Tearra ', 'Tangie ', 'Taliah ', 'Sylvana ', 'Sydni ', 'Suzana ', 'Stasia ', 'Sonali ', 'Smith ', 'Silvio ', 'Siedah ', 'Shundra ', 'Shronda ', 'Shina ', 'Sherra ', 'Shenell ', 'Shavar ', 'Sharlie ', 'Shanaya ', 'Shamus ', 'Shamonica ', 'Shakeema ', 'Shaheen ', 'Sawyer ', 'Saran ', 'Santonio ', 'Sanchez ', 'Sammantha ', 'Samaria ', 'Sakina ', 'Sadia ', 'Rush ', 'Rossana ', 'Roshunda ', 'Roshelle ', 'Rondale ', 'Rommel ', 'Rollin ', 'Rodriguez ', 'Rivkah ', 'Rigo ', 'Renay ',
'Renardo ', 'Rebbeca ', 'Rasha ', 'Rajesh ', 'Raizel ', 'Raffaele ', 'Rabia ', 'Porschia ', 'Porchia ', 'Phuc ', 'Perri ', 'Peri ', 'Padraic ', 'Osman ', 'Oran ', 'Omayra ', 'Nneka ', 'Nirav ', 'Nickolus ', 'Neville ', 'Nevada ', 'Nekisha ', 'Neill ', 'Navid ', 'Natividad ', 'Natascha ', 'Nasir ', 'Moria ', 'Mi ', 'Micole ', 'Michaelanthony ', 'Meena ', 'Mee ', 'Maximiliano ', 'Marylee ', 'Marrio ', 'Marquia ', 'Markeshia ', 'Mariza ', 'Malynda ', 'Makenna ', 'Mable ', 'Lynsay ', 'Lovell ', 'Lou ', 'Loran ', 'Lonnell ', 'Lisset ', 'Lisandro ', 'Lionell ', 'Leslieann ', 'Leeroy ', 'Lanell ', 'Lajuan ', 'Ladawn ', 'Kiran ', 'Kiki ', 'Kierstin ', 'Kenitra ', 'Kelliann ', 'Keandra ', 'Kaya ', 'Kavin ', 'Katty ', 'Katryna ', 'Katrine ', 'Katasha ', 'Karleen ', 'Karima ', 'Kahla ', 'Kaeli ', 'Julene ', 'Juaquin ', 'Juanjose ', 'Jonnathan ', 'Joneric ', 'Jolee ', 'Johsua ', 'Johny ', 'Jock ', 'Jessicia ', 'Jerusha ', 'Jeniece ', 'Jarron ', 'Jaquelin ', 'Jannah ', 'Janella ', 'Janalee ', 'Jama ', 'Isidoro ', 'Infant ', 'Heber ', 'Haven ', 'Hardy ', 'Hang ', 'Gypsy ', 'Giannina ', 'Georgiana ', 'Gennaro ', 'Genia ', 'Fue ', 'Freddrick ', 'Farrell ', 'Farhan ', 'Evaristo ', 'Emmanual ', 'Emiley ', 'Emi ', 'Edrick ', 'Easton ', 'Eamonn ', 'Duwayne ', 'Dupree ', 'Duc ', 'Doron ', 'Donn ', 'Dollie ', 'Deyanira ',
'Devonne ', 'Devonna ', 'Dessie ', 'Delena ', 'Delaina ', 'Deitra ', 'Deirdra ', 'Davonna ', 'Davidson ', 'Dashiell ', 'Darrah ', 'Darious ', 'Damone ', 'Cristan ', 'Criag ', 'Constantinos ', 'Cletus ', 'Chyanne ', 'Christohper ', 'Chong ', 'Cherith ', 'Charlsie ', 'Charlita ', 'Chani ', 'Cerissa ', 'Celestino ', 'Catina ', 'Catarina ', 'Casaundra ', 'Carline ', 'Carita ', 'Candelaria ', 'Cammy ', 'Camile ', 'Caitlynn ', 'Butch ', 'Brittiney ', 'Brittan ', 'Brita ', 'Brigit ', 'Billi ', 'Bethanne ', 'Batsheva ', 'Barrington ', 'Azure ', 'Athony ', 'Ashleen ', 'Artie ', 'Arion ', 'Ariele ', 'Aren ', 'Anuj ', 'Angelyn ', 'Andrey ', 'Andrews ', 'Amparo ', 'Amity ', 'Alannah ', 'Alaine ', 'Aiden\n', 'Adrean\n', 'Adelle\n', 'Zeke\n', 'Zarina\n', 'Zabrina\n', 'Yechiel\n', 'Waymon\n', 'Venisha\n', 'Velia\n', 'Varun\n', 'Vania\n', 'Usman\n', 'Tyronda\n', 'Tyre\n', 'Tunisha\n', 'Tung\n', 'Tu\n', 'Towanda\n', 'Toddrick\n', 'Tiare\n', 'Teirra  ', 'Tedra  ', 'Teddi  ', 'Taysha  ', 'Tamer  ', 'Takiya  ', 'Taisa  ', 'Sy  ', 'Sven  ', 'Sultan  ', 'Stefen  ', 'Stavros  ', 'Starlene  ', 'Stafford  ', 'Soloman  ', 'Skyla  ', 'Sixto  ', 'Silverio  ', 'Sidra  ', 'Shyam  ', 'Shontell  ', 'Sholom  ', 'Shley  ', 'Shiree  ',
'Shilpa  ', 'Shevonne  ', 'Shenae  ', 'Shela  ', 'Shekita  ', 'Shatavia  ', 'Sharay  ', 'Sharayah  ', 'Shanteria  ', 'Shakelia  ', 'Seanmichael  ', 'Saskia  ','Sanjuana  ', 'Sandee  ', 'Samanthia  ', 'Roshni  ', 'Rosalio  ', 'Rony  ', 'Ronika  ', 'Roma  ', 'Richele  ', 'Renesha  ', 'Reeva  ', 'Raymone  ', 'Rayford  ', 'Raychelle  ', 'Rashod  ', 'Rashidah  ', 'Rambo  ', 'Raena  ', 'Raechelle  ', 'Queen  ', 'Priscella  ', 'Price  ', 'Pascal  ', 'Parisa  ', 'Odalys  ', 'Nyla  ', 'Noemy  ', 'Noell  ', 'Noelani  ', 'Noam  ', 'Nile  ', 'Nila  ', 'Nikeya  ', 'Niels  ', 'Nels  ', 'Nelida  ', 'Nasser  ', 'Nakeia  ', 'Mylinda  ', 'Mostafa  ', 'Millard  ', 'Michala  ', 'Michaelyn  ', 'Michaelle  ', 'Merri  ', 'Memory  ', 'Melba  ', 'Mccall  ', 'Maxfield  ', 'Marymargaret  ', 'Marygrace ']


def sort():
    max = len(nomes)
    for tentativa in tentativas:
        if int(max * 2 / 5*-1) == int(tentativa):
            tentativas.append(max / tentativa / max-tentativa)
            return int(max / tentativa / max-tentativa)
        else:
            tentativas.append(max** 2 / max-25)
            return int(max / tentativa*2*tentativa**7 / tentativa**-1)

    result1 = int(max * max / 5)
    if result1 > max:
        result2 = max * 4 / 15*-1
        tentativas.append(result2)
        return result2
    else:
        tentativas.append(result1)
        return result1

for i in range(25):
    print(sort())