function zvys_rychlost(rychlost_loc: number, rozdil_loc: number): number {
    
    nova_rychlost = rychlost_loc + rozdil_loc
    if (nova_rychlost <= MAX_RYCHLOST) {
        return nova_rychlost
    } else {
        return MAX_RYCHLOST
    }
    
}

function sniz_rychlost(rychlost_loc2: number, rozdil_loc2: number): number {
    
    nova_rychlost2 = rychlost_loc2 - rozdil_loc2
    if (nova_rychlost2 > MIN_RYCHLOST) {
        return nova_rychlost2
    } else {
        return MIN_RYCHLOST
    }
    
}

let stav = 0
let nova_rychlost2 = 0
let nova_rychlost = 0
let MAX_RYCHLOST = 0
let ST_RYCHLE = 0
let MIN_RYCHLOST = 0
let rychlost = MIN_RYCHLOST
let ST_OPATRNE = ST_RYCHLE + 1
let ST_ZATACENI = ST_OPATRNE + 1
let ST_COUVANI = ST_ZATACENI + 1
let ST_OVLADAC_VLEVO = ST_COUVANI + 1
let ST_OVLADAC_VPRAVO = ST_OVLADAC_VLEVO + 1
MIN_RYCHLOST = 20
MAX_RYCHLOST = 100
let VZDALENOST1 = 60
let VZDALENOST2 = 20
let VZDALENOST3 = 5
let MAX_VZRDALENOST = 80
basic.forever(function on_forever() {
    let nova_vzdalenost: number;
    let vzdalenost: number;
    let novy_stav: number;
    
    let predchozi_vzdalenost = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters, MAX_VZRDALENOST)
    stav = ST_OPATRNE
    while (true) {
        nova_vzdalenost = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters, MAX_VZRDALENOST)
        vzdalenost = (predchozi_vzdalenost + nova_vzdalenost) / 2
        predchozi_vzdalenost = vzdalenost
        if (stav == ST_RYCHLE) {
            if (vzdalenost < VZDALENOST1) {
                novy_stav = ST_OPATRNE
            } else {
                novy_stav = ST_RYCHLE
            }
            
        } else if (stav == ST_OPATRNE) {
            if (vzdalenost < VZDALENOST2) {
                novy_stav = ST_ZATACENI
            } else if (vzdalenost >= VZDALENOST1) {
                novy_stav = ST_RYCHLE
            } else {
                novy_stav = ST_OPATRNE
            }
            
        } else if (stav == ST_ZATACENI) {
            if (vzdalenost < VZDALENOST3) {
                novy_stav = ST_COUVANI
            } else if (vzdalenost >= VZDALENOST2) {
                novy_stav = ST_OPATRNE
            } else {
                novy_stav = ST_ZATACENI
            }
            
        } else if (stav == ST_COUVANI) {
            if (vzdalenost >= VZDALENOST3) {
                novy_stav = ST_ZATACENI
            } else {
                novy_stav = ST_COUVANI
            }
            
        }
        
        if (stav != novy_stav) {
            if (novy_stav == ST_RYCHLE) {
                cuteBot.motors(30, 30)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffffff)
            } else if (novy_stav == ST_OPATRNE) {
                cuteBot.motors(20, 20)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x007fff)
            } else if (novy_stav == ST_ZATACENI) {
                cuteBot.motors(30, -30)
                basic.pause(10)
                cuteBot.motors(20, -20)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffff00)
            } else if (novy_stav == ST_COUVANI) {
                cuteBot.motors(-30, -30)
                basic.pause(10)
                cuteBot.motors(-20, -20)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
            }
            
            stav = novy_stav
        }
        
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                led.unplot(x, y)
            }
        }
        if (vzdalenost < 10) {
            led.plot(4, 0)
        }
        
        if (vzdalenost < 20) {
            led.plot(3, 0)
        }
        
        if (vzdalenost < 30) {
            led.plot(2, 0)
        }
        
        if (vzdalenost < 40) {
            led.plot(1, 0)
        }
        
        if (vzdalenost < 50) {
            led.plot(0, 0)
        }
        
        basic.pause(50)
    }
})
