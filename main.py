def zvys_rychlost(rychlost_loc: number, rozdil_loc: number):
    global nova_rychlost
    nova_rychlost = rychlost_loc + rozdil_loc
    if nova_rychlost <= MAX_RYCHLOST:
        return nova_rychlost
    else:
        return MAX_RYCHLOST

def sniz_rychlost(rychlost_loc2: number, rozdil_loc2: number):
    global nova_rychlost2
    nova_rychlost2 = rychlost_loc2 - rozdil_loc2
    if nova_rychlost2 > MIN_RYCHLOST:
        return nova_rychlost2
    else:
        return MIN_RYCHLOST
stav = 0
nova_rychlost2 = 0
nova_rychlost = 0
MAX_RYCHLOST = 0
ST_RYCHLE = 0
MIN_RYCHLOST = 0
rychlost = MIN_RYCHLOST
ST_OPATRNE = ST_RYCHLE + 1
ST_ZATACENI = ST_OPATRNE + 1
ST_COUVANI = ST_ZATACENI + 1
ST_OVLADAC_VLEVO = ST_COUVANI + 1
ST_OVLADAC_VPRAVO = ST_OVLADAC_VLEVO + 1
MIN_RYCHLOST = 20
MAX_RYCHLOST = 100
VZDALENOST1 = 60
VZDALENOST2 = 20
VZDALENOST3 = 5
MAX_VZRDALENOST = 80

def on_forever():
    global stav
    predchozi_vzdalenost = cuteBot.ultrasonic(cuteBot.SonarUnit.CENTIMETERS, MAX_VZRDALENOST)
    stav = ST_OPATRNE
    while True:
        nova_vzdalenost = cuteBot.ultrasonic(cuteBot.SonarUnit.CENTIMETERS, MAX_VZRDALENOST)
        vzdalenost = (predchozi_vzdalenost + nova_vzdalenost) / 2
        predchozi_vzdalenost = vzdalenost
        if stav == ST_RYCHLE:
            if vzdalenost < VZDALENOST1:
                novy_stav = ST_OPATRNE
            else:
                novy_stav = ST_RYCHLE
        elif stav == ST_OPATRNE:
            if vzdalenost < VZDALENOST2:
                novy_stav = ST_ZATACENI
            elif vzdalenost >= VZDALENOST1:
                novy_stav = ST_RYCHLE
            else:
                novy_stav = ST_OPATRNE
        elif stav == ST_ZATACENI:
            if vzdalenost < VZDALENOST3:
                novy_stav = ST_COUVANI
            elif vzdalenost >= VZDALENOST2:
                novy_stav = ST_OPATRNE
            else:
                novy_stav = ST_ZATACENI
        elif stav == ST_COUVANI:
            if vzdalenost >= VZDALENOST3:
                novy_stav = ST_ZATACENI
            else:
                novy_stav = ST_COUVANI
        if stav != novy_stav:
            if novy_stav == ST_RYCHLE:
                cuteBot.motors(30, 30)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffffff)
            elif novy_stav == ST_OPATRNE:
                cuteBot.motors(20, 20)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0x007fff)
            elif novy_stav == ST_ZATACENI:
                cuteBot.motors(30, -30)
                basic.pause(10)
                cuteBot.motors(20, -20)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffff00)
            elif novy_stav == ST_COUVANI:
                cuteBot.motors(-30, -30)
                basic.pause(10)
                cuteBot.motors(-20, -20)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff0000)
            stav = novy_stav
        for x in range(5):
            for y in range(5):
                led.unplot(x, y)
        if vzdalenost < 10:
            led.plot(4, 0)
        if vzdalenost < 20:
            led.plot(3, 0)
        if vzdalenost < 30:
            led.plot(2, 0)
        if vzdalenost < 40:
            led.plot(1, 0)
        if vzdalenost < 50:
            led.plot(0, 0)
        basic.pause(50)
basic.forever(on_forever)
