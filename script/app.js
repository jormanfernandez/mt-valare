var killScript = false;

try {
  (() => {
    console.log(+(new Date()), "Loading...");
  })();
} catch (e) {
  killScript = true;
}

if (!document.querySelector || killScript) {
  throw (function() {
    document.addEventListener("DOMContentLoaded", function() {

      var dom = document.getElementById("app");

      var screen = document.getElementsByClassName("loading-screen")[0],
        opacity = 1.00,
        interval = setInterval(function() {

          opacity -= 0.1;

          if (opacity <= 0.00) {
            screen.setAttribute("style", "display: none");
            console.log(+(new Date()), "Loaded");
            clearInterval(interval);
            return;
          }

          screen.setAttribute("style", "opacity: " + opacity);
        }, 50);

      var notFound = [
        '<div class="img_logo">',
        '<span>-</span>',
        '</div>',
        '<div class="menu_container">',
        '<header>',
        '<label class="labelMenu" onClick="location.reload()">',
        '<div name="parent">',
        '<span style="color: yellow;">',
        '&#x25B3;',
        '</span>',
        '</div>',
        '</label>',
        '</header>',
        '</div>',
        '<div class="content">',
        '<p>Navegador no aceptado</p>',
        '</div>',
        '<div class="footer">',
        '<span>Mt. Valare</span> ',
        '<br>',
        '<br>',
        '<a href="mailto:' + [
          "jormaneduardofernandez",
          "@gmail.com"
        ].join("") + '?Subject=Mt. Valare">Jorman Fernandez</a>',
        '</div>'
      ].join(" ");

      dom.innerHTML = notFound;

    });
  })(), new Error("Navegador no aceptado");
}

killScript = undefined;
Vue.config.devtools = false;

/**
let img = new Image();
img.src = "https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=download&id=1zsVjmTu1HfV4yRX3CADYDXD_R7PW4H9c";

console.log(img);
/**/

let app = null;
let enemiesComponent = null;

document.addEventListener("DOMContentLoaded", () => {

  /**
   * Remueve los espacios en blanco a la derecha e izquierda
   * @param string text
   */
  const trim = text => text.replace(/^\s+|\s+$/g, "");

  /**
   * Detectamos si un string esta vacio
   * @param string val
   */
  const isEmpty = val => {

    switch (typeof val) {

      case "object":

        var clean = false;

        for (var x in val) {

          if (!isEmpty(val[x])) {
            clean = true;
            break;
          }
        }

        return !clean;

        break;

      default:
        return (val == null || val.toString().replace(/^\s+|\s+$/gm, "").length === 0);
    }
  }

  const centerComponent = (component, time) => {

    component.style = "left: 0; margin: auto; ";

    let windowsHeight = (window.innerHeight / 2),
      padding = 30;

    try {

      let el = component.$el.children[0],
        height = parseInt(el.clientHeight + padding);

      component.style += "top: " + parseInt(windowsHeight - (height / 2)) + "px;";

    } catch (e) {
      component.style += "top: " + parseInt(windowsHeight - (72 / 2)) + "px;";
      setTimeout(component.center, !time ? 2 : time);
    }

    return component.style;
  }

  const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    ];

  const between = (value, min, max) => {
    return value >= min && value <= max;
  }

  const setNumberBetween = (number, min, max) => {

    let num = parseInt(number);

    if (isNaN(num)) {

      let arr = [];

      for (let idx of number.toString()) {
        arr.push(idx.charCodeAt(0));
      }

      num = parseInt(arr.join(""));
    }

    if (num > max)
      num = num - max;
    else if (num < min)
      num = num + (between(min, 0, 1) ? min + 1 : min);

    num = Math.ceil(num);

    if (!between(num, min, max)) {
      num = setNumberBetween(num, min, max);
    }

    return num > max ? max : num < min ? min : num;
  }

  const randomNumber = (min, max, isFloat) => {

    if (isFloat)
      return Math.random() * (max - min) + min;
    else
      return Math.ceil(Math.random() * (max - min) + min);
  }

  const stringFromNumber = number => {

    let result = "";
    let stringNumber = number.toString();

    for (let idx = 0; idx < stringNumber.length; idx++) {

      let get = idx % 2 == 0 ? 2 : 3;
      let numbers = stringNumber.substring(idx, idx + get);

      numbers = setNumberBetween(numbers, 45, 125);

      result += String.fromCharCode(parseInt(numbers));
    }

    return result;
  }

  Number.prototype.string = function(from, to) {

    let number = this.valueOf().toString().split("");

    from = isNaN(from) || from < 0 ? -1 : from;
    to = isNaN(to) || to < 0 ? -1 : to;

    if (from < 0) {
      if (to < 0)
        return number.join("");
      else
        return number.reverse().slice(0, to).reverse().join("");
    }

    if (to < 0)
      return number.join("").substring(from);
    else
      return number.join("").substring(from, to);
  }

  const removeLoadingScreen = () => {

    let screen = document.querySelector(".loading-screen");

    let hideScreen = () => {

      screen.firstElementChild.innerText = "Iniciando...";

      setTimeout(() => {
        let opacity = 1.00,
          interval = setInterval(() => {

            opacity -= 0.1;

            if (opacity <= 0.00) {
              screen.setAttribute("style", "display: none");
              console.log(+(new Date()), "Loaded");
              clearInterval(interval);
              return;
            }

            screen.setAttribute("style", "opacity: " + opacity);
          }, 50);
      }, 1000);
    }

    let hideEnemies = () => {
      try {
        app.showEnemyList = false;
      } catch (e) {
        setTimeout(hideEnemies, 100);
        return;
      }

      hideScreen();
    }

    setTimeout(hideEnemies, 4000);
  }

  Object.totalFreeze = element => {

    if (typeof element != "object")
      return;

    for (let idx in element) {
      if (typeof element[idx] != "object")
        continue;

      Object.totalFreeze(element[idx]);
    }

    Object.freeze(element);
  }

  Object.clone = object => {

    if (Array.isArray(object))
      return Object.assign(object, []);
    else
      return Object.assign(object, {});
  }

  class ItemList {
    constructor() {

    }

    _names() {
      return Object.keys(this);
    }

    _exists(item) {
      return typeof this[item] != "undefined";
    }

    _add(item) {

      if (!item.id || isEmpty(item.id)) {
        return console.error("El item ingresado no posee un id", item);
      }

      item.name = trim(item.name ? item.name : "");

      let itemProperty = {
        name: !isEmpty(item.name) ? item.name : stringFromNumber(randomNumber(1, 9999)),
        id: item.id,
        desc: item.desc ? item.desc : "Sin descripcion",
        icon: "assets/img/items/" + (item.icon ? item.icon : "unknow.png"),
        confirm: item.confirm ? true : false,
        effect: typeof item.effect == "function" ? item.effect : component => {
          component.popWindow({
            type: "info",
            title: "Oopssie",
            message: "Este elemento no hizo nada"
          });
        }
      }

      if (this._exists(itemProperty.id)) {
        let newId = stringFromNumber(randomNumber(1, 9999));
        console.warn(`id "${itemProperty.id}" reasignado a "${newId}" `);
        itemProperty.id = newId;
      }

      this[itemProperty.id] = itemProperty;
    }
  }

  let Items = new ItemList();

  for (let item of [{
      name: "Posion de 20p",
      desc: "Esta posion te sana 20p de tu vida",
      id: "20pHealth",
      icon: "20pHealth.gif",
      confirm: false,
      effect: main => {
        main.characters.self.heal(20);
      }
    },
    {
      name: "Posion vitalizadora",
      desc: "Incrementa tu fuerza en varios puntos al tomarla durante varios segundos",
      id: "increaseStrength",
      icon: "strengthPoison.gif",
      confirm: false,
      effect: main => {

        try {

        app.increaseStrength = parseInt(app.increaseStrength) + 1;

        setTimeout(() => app.increaseStrength = app.increaseStrength - 1 < 1 ? 1 : app.increaseStrength - 1, 5000);

        } catch (e) {
          console.error("Error usando posion", e);
        }
      }
    },
  {
    name: "Pieza de Banael'q",
    desc: "Estos son los pedazos de la espada usada por el primero en enfrentarse a la sombra. Incrustarlos en tu arma incrementa tu fuerza en gran manera",
    id: "sword_cleaner",
    icon: "sword_cleaner.gif",
    confirm: true,
    effect: main => {
      main.characters.self.increaseStrength(randomNumber(75, 120));
    }
  },
  {
    id: "ancient_book",
    name: "Libro de conjuros",
    desc: "El libro de las palabras antiguas. Debes conocer el conjuro que quieres usar si estás decidido a invocarlo.",
    icon: "ancient_book.gif",
    confirm: true,
    effect: main => {

      main.doPrompt({
        text: "Ya no hay vuelta atrás, dime el conjuro",
        button: {
          no: "No lo se",
          ok: "Invocar Conjuro"
        },
        callbacksOnCancel: () => {
          main.popWindow({
            type: "info",
            message: ["Perdiste el libro", "Se más cuidadoso al decidir usarlos"],
            duration: 3000
          });
        },
        callbacks: value => {
          switch(value) {

            case "Requie'q in sororai faus":
              if(!enemiesComponent || enemiesComponent.$children.length < 1) {
                return main.popWindow({
                  type: "info",
                  message: ["No habian enemigos"],
                  duration: 2000
                });
              }

              enemiesComponent.$children.forEach(component => component.individual.defeat());

            break;

            default:

              main.doAlert({
                text: `El conjuro "${value}" no existe en el libro...`
              });
          }
        }
      });

    }
  }]) {
    Items._add(item);
  }

  Object.totalFreeze(Items);

  class Inventory {

    constructor() {
      this._bag = {}
    }

    List() {

      let list = [];

      for (let i in this._bag) {

        if (!Items._exists(i)) {
          continue;
        }

        list.push(Items[i]);
      }

      return list;
    }

    Add(item, amount) {
      amount = !amount || isNaN(amount) ? 1 : parseInt(amount);

      if (!Items._exists(item))
        return app.popWindow({
          type: "error",
          title: "Elemento equivocado",
          message: "El elemento " + item + " no existe"
        });

      this._bag[item] = !this._bag[item] ? amount : this._bag[item] + amount;
    }

    Delete(item, amount) {
      amount = !amount || isNaN(amount) ? 1 : parseInt(amount);

      if (this._bag[item] < 1) {
        delete this._bag[item];
        return;
      }

      this._bag[item] -= amount;

      if (this._bag[item] < 1)
        delete this._bag[item];
    }

    useItem(item, callback) {

      if (this._bag[item] < 0) {
        return;
      }

      if (Items._exists(item) &&
        Items[item].confirm) {
        app.doConfirm({
          text: "¿Desea usar el item " + Items[item].name + "?",
          button: {
            ok: "Sí",
            no: "No"
          },
          callbacks: [() => {

            this.Delete(item, 1);
            callback();
            if (Items._exists(item) && typeof Items[item].effect == "function") {
              Items[item].effect(app);
            }
          }]
        });
      } else {
        this.Delete(item, 1);
        if (Items._exists(item) && typeof Items[item].effect == "function") {
          Items[item].effect(app);
        }
      }
    }
  }

  class Character {

    constructor(config) {

      config.name = config.name ? trim(config.name) : "";

      this.name = !isEmpty(config.name) ? config.name : "Desconocido";

      this.avatar = {
        dir: "assets/img/characters/",
        main: config.avatar ? config.avatar : "unknow.png",
        src: ""
      };

      this.avatar.src = this.avatar.dir + (this.avatar.main == "unknow.png" ? "unknow.png" : this.avatar.main + "-normal.png");

      this.health = parseFloat(config.health) > 0.00 ? parseFloat(config.health).toFixed(2) : 100.00;
      this.health = new Number(this.health);
      this.maxHealth = this.health;

      this.strength = parseFloat(config.strength) > 0.00 ? parseFloat(config.strength) : 1.00;
      this.criticAttackProbability = config.critic && parseFloat(config.critic) > 0.00 ?
        parseFloat(config.critic) : 0.01;

      try {
        this.criticAttackProbability = this.criticAttackProbability.toFixed(2);
      } catch (e) {
        this.criticAttackProbability = parseFloat(this.criticAttackProbability + ".01").toFixed(2);
      }


      if (this.criticAttackProbability > 1.00)
        this.criticAttackProbability = 1.00;
    }

    setAvatar(state) {

      if(this.avatar.main == "unknow.png") {
        return;
      }

      let avatar = this.avatar.main;
      let emotion = "normal";
      switch(state) {
        case "embarassed":
        case "frustrated":
        case "angry":
        case "surprised":
          emotion = state;
        break;
      }

      this.avatar.src = this.avatar.dir + avatar + "-" + emotion + ".png";
    }

    heal(points) {

      let health = (new Number(this.health)),
        sum = health + new Number(points);

      if (sum > this.maxHealth)
        this.health = this.maxHealth;
      else
        this.health = sum;
    }

    increaseHealth(points) {

      this.maxHealth = new Number(this.maxHealth) + new Number(points);
      this.health = this.maxHealth;
    }

    increaseStrength(points) {
      this.strength += points;
    }

    increaseCriticProb(points) {

      let amount = (points / 100).toFixed(2);

      if ((this.criticAttackProbability + amount) >= 1.00)
        this.criticAttackProbability = 0.98;
      else
        this.criticAttackProbability += amount;
    }

    calculateAttack(target) {

      let values = {
        isCritical: null,
        increasedBy: null,
        probability: null,
        missed: false,
        attackDamage: this.strength
      };

      if ((this.strength - 2) > target.strength) {
        values.isCritical = between(randomNumber(0.49, 0.56, true).toFixed(2), 0.50, 0.55);
      } else {
        values.probability = randomNumber(0, 1, true).toFixed(2);
        values.isCritical = between(values.probability, 0.00, this.criticAttackProbability);
      }

      if (values.isCritical) {
        values.increasedBy = randomNumber(2, 5);
        values.attackDamage = values.increasedBy * this.strength;
      }

      if (!values.isCritical && target.strength >= this.strength) {
        let probabilityMissed = randomNumber(0, 1, true).toFixed(2);
        values.missed = between((this.strength / target.strength).toFixed(2), 0.00, probabilityMissed);
      }

      return values;
    }

    attack(target) {

      let values = this.calculateAttack(target.individual);

      if (values.missed)
        return target.displayMissHit();

      target.individual.getHurt(values.attackDamage);

      if (values.isCritical)
        target.displayCriticHit(values.increasedBy);
    }

    getHurt(points) {

      let health = (new Number(this.health)),
        sum = health - new Number(points);

      if (sum < 0.00)
        this.health = 0.00;
      else
        this.health = sum;
    }

    isDead() {
      return this.health <= 0.00;
    }
  }

  class Enemy extends Character {

    constructor(config) {

      super(config);

      this.avatar = "assets/img/enemies/" + (config.avatar ? config.avatar : "unknow.png");
      this.class = config.class ? config.class : "";
      this.component = config.component ? config.component : undefined;
      this.defaultAvatar = this.avatar;
      this.stopAutoAction = false;
      this.loot = typeof config.loot == "function" ? config.loot : undefined;

      this.description = config.description ? config.description : undefined;

      this.position = config.position ? config.position : undefined;

      this.special = {
        rate: {
          min: -1,
          max: -1
        },
        calculate: () => {

          if (typeof this.special.attack != "function")
            return false;

          if (this.special.rate.min <= 0.00)
            return false;

          if (this.special.rate.max > 100.00)
            return false;

          return between(randomNumber(0.00, 100.00, true).toFixed(2),
            this.special.rate.min,
            this.special.rate.max);
        },
        attack: undefined
      }

      if (typeof config.special == "object") {
        this.setUpSpecial(config.special);
      }

      if (typeof config.autoAction != "object")
        return;

      if (typeof config.autoAction.fn != "function")
        return;

      setTimeout(() => {
        let interval = setInterval(() => {

          if (app.characters.self.isDead()) {
            clearInterval(interval);
            return;
          }

          if (config.autoAction.clear(this) || this.stopAutoAction) {
            clearInterval(interval);
            return;
          }

          config.autoAction.fn(this, config.autoAction.target);

        }, config.autoAction.every);
      }, randomNumber(0.01, 3.50, true).toFixed(2) * 1000);

    }

    setUpSpecial(options) {

      if (typeof options.rate != "object")
        return;

      this.special.rate = options.rate;

      if (typeof options.calculate == "function")
        this.special.calculate = options.calculate;

      if (typeof options.attack == "function")
        this.special.attack = options.attack;
    }

    attack(target) {

      if (this.special.calculate(this)) {
        return this.special.attack(this);
      }

      let values = this.calculateAttack(app.characters[target]);

      if (values.missed)
        return app.characters[target].displayMissHit();

      app.characters[target].getHurt(values.attackDamage);
      app.isHurt = true;
      setTimeout(() => {
        app.isHurt = false;
      }, 200);

      if (values.isCritical)
        app.characters[target].displayCriticHit(values.increasedBy);
    }

    defeat() {
      this.getHurt(this.maxHealth);
      this.component.displayCriticHit("100%");
    }
  }

  let enemyTypes = {}

  for (let enemy of [{
        id: "dark-spectre",
        name: "Espectro nocturno",
        class: "dark-spectre",
        description: [
          "Este espectro es aterrador",
          "No posee un ataque especial conocido, pero es bastante fuerte.",
          "Siempre se encuentra cerca del suelo"
        ],
        health: 320.00,
        strength: 33.50,
        criticAttackProbability: 25.00,
        position: {
          left: {
            min: 5,
            max: 80
          },
          top: {
            min: 45.00,
            max: 45.00
          }
        },
        attackSpeed: 6500,
        autoAction: {
          fn: (self, target) => {
            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 2500
        }
      },
      {
        id: "tree-bug",
        name: "Insecto de Arbol",
        description: [
          "Este insecto se mueve por todos lados.",
          "No es muy fuerte, pero su regeneración de vida lo hace molesto"
        ],
        class: "tree-bug",
        health: 90.00,
        strength: 0.3,
        position: {
          left: {
            min: 5,
            max: 85
          },
          top: {
            min: 5,
            max: 80
          }
        },
        loot: inventory => {

          let itemSet = {
            "20pHealth": {
              min: 0,
              max: randomNumber(1, 3)
            }
          }

          let looted = false;

          for (let item in itemSet) {

            if (!randomNumber(0, 3) != 2)
              continue;

            let amount = randomNumber(itemSet[item].min, itemSet[item].max);

            if (amount < 1)
              continue;

            looted = true;
            inventory.Add(item, amount);
          }

          return looted;
        },
        attackSpeed: 3000,
        autoAction: {
          fn: (self, target) => {
            self.component.generatePosition();

            if (self.health == self.maxHealth)
              return;

            if (!between(randomNumber(0.00, 100.00, true).toFixed(2), 30.00, 80.00))
              return;

            self.heal(((new Number(self.maxHealth)) / 3).toFixed(2));
          },
          clear: self => {
            return self.isDead();
          },
          every: 1500
        }
      },
      {
        id: "whom-bat",
        name: "Murciélago espectro",
        description: [
          "Vuela por todos los alrededores. Es algo molesto ya que no para de moverse y es algo fuerte.",
          "Se encuentra en las zonas altas del monte, donde las sombras se agruparon."
        ],
        class: "whom-bat",
        health: 60.00,
        strength: 4.7,
        position: {
          left: {
            min: 5,
            max: 85
          },
          top: {
            min: 5,
            max: 80
          }
        },
        loot: inventory => {

          let itemSet = {
            "20pHealth": {
              min: 0,
              max: randomNumber(2, 5)
            }
          }

          let looted = false;

          for (let item in itemSet) {

            if (!randomNumber(0, 4) != 2)
              continue;

            let amount = randomNumber(itemSet[item].min, itemSet[item].max);

            if (amount < 1)
              continue;

            looted = true;
            inventory.Add(item, amount);
          }

          return looted;
        },
        attackSpeed: 4000,
        autoAction: {
          fn: (self, target) => {
            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 1500
        }
      },
      {
        id: "giant-enemy",
        name: "Gigante",
        class: "giant-enemy",
        description: [
          "Extremadamente fuerte, se encuentra en el interior de las cuevas.",
          "No suele moverse, pero cada golpe es demoledor. Suele hacer aparecer pequeños insectos de arbol."
        ],
        health: 760.00,
        strength: 120.00,
        criticAttackProbability: 45.00,
        loot: inventory => {

          let itemSet = {
            "ancient_book": {
              min: 0,
              max: 1
            }
          }

          let looted = false;

          for (let item in itemSet) {

            if (!randomNumber(0, 4) != 2)
              continue;

            let amount = randomNumber(itemSet[item].min, itemSet[item].max);

            if (amount < 1)
              continue;

            looted = true;
            inventory.Add(item, amount);
          }

          return looted;
        },
        position: {
          left: {
            min: 30,
            max: 70
          },
          top: {
            min: 40.00,
            max: 40.00
          }
        },
        attackSpeed: 6500,
        autoAction: {
          fn: (self, target) => {

            if(enemiesComponent.$children.length > 5)
              return;

            self.component.$root.spawnEnemies({
              "tree-bug": randomNumber(0, 2)
            });
          },
          clear: self => {
            return self.isDead();
          },
          every: 7500
        }
      },
      {
        id: "lake-demon",
        name: "Demonio del Lago",
        class: "lake-demon",
        description: [
          "No es muy fuerte, pero es muy rapido.",
          "Puede evenenarte con su aire."
        ],
        health: 45.00,
        strength: 7.00,
        criticAttackProbability: 15.00,
        position: {
          left: {
            min: 5,
            max: 80
          },
          top: {
            min: 70.00,
            max: 70.00
          }
        },
        attackSpeed: 2500,
        autoAction: {
          fn: (self, target) => {

            if (!self.poisioned) {

              self.poisioned = true;

              let iteration = 1;
              let hits = randomNumber(2, 5);
              let interval = setInterval(() => {

                if (iteration >= hits || app.characters.self.isDead()) {
                  self.poisioned = false;
                  return clearInterval(interval);
                }

                app.characters.self.getHurt(randomNumber(7, 12));
                app.characters.self.displayCriticHit();

                iteration++;
              }, 3000);
            }

            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 2500
        }
      },
      {
        id: "horse-barbarian",
        name: "Bárbaro",
        class: "horse-barbarian",
        description: [
          "Barbaros que vinieron de otra parte del reino.",
          "Con sus caballos hace dificil golpearlos ya que se mueven de manera constante"
        ],
        health: 120,
        strength: 4.10,
        criticAttackProbability: 45.00,
        special: {
          rate: {
            min: 15.00,
            max: 35.00
          },
          attack: self => {

            let iteration = 1;
            let hits = randomNumber(2, 3);
            let interval = setInterval(() => {

              if (app.characters.self.isDead() || iteration >= hits) {
                return clearInterval(interval);
              }

              iteration++;

              if(self.health != self.maxHealth && iteration % 2 == 0) {
                self.heal(randomNumber(2,7));
                return;
              }

              app.characters.self.getHurt(randomNumber(1, self.strength));
              app.characters.self.displayCriticHit();
            }, 2000);
          }
        },
        position: {
          left: {
            min: 5,
            max: 70
          },
          top: {
            min: 10.00,
            max: 50.00
          }
        },
        attackSpeed: 4500,
        autoAction: {
          fn: (self, target) => {

            if (!between(randomNumber(30, 60), 0, 100))
              return;

            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 2500
        }
      },
      {
        id: "ragbag",
        name: "Bolsa de Huesos",
        class: "ragbag",
        description: [
          "Son muertos dejados atras por las sombras. Son muy resistentes a los golpes.",
          "Te pueden hacer una mordida que puede doler por un buen rato."
        ],
        health: 120.00,
        strength: 5.50,
        criticAttackProbability: 80.00,
        special: {
          rate: {
            min: 20.00,
            max: 50.00
          },
          attack: self => {

            let iteration = 1;
            let hits = randomNumber(2, 5);
            let interval = setInterval(() => {

              if (app.characters.self.isDead() || iteration >= hits) {
                return clearInterval(interval);
              }

              app.characters.self.getHurt(randomNumber(6, 18));
              app.characters.self.displayCriticHit();

              iteration++;
            }, 2000);
          }
        },
        position: {
          left: {
            min: 5,
            max: 80
          },
          top: {
            min: 45.00,
            max: 45.00
          }
        },
        attackSpeed: 3500,
        autoAction: {
          fn: (self, target) => {

            if (!between(randomNumber(30, 60), 0, 100))
              return;

            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 4500
        }
      },
      {
        id: "spider",
        name: "Araña",
        class: "spider",
        description: [
          "Son muertos dejados atras por las sombras. Son muy resistentes a los golpes.",
          "Te pueden hacer una mordida que puede doler por un buen rato."
        ],
        health: 45.00,
        strength: 2.00,
        criticAttackProbability: 30.00,
        special: {
          rate: {
            min: 20.00,
            max: 50.00
          },
          attack: self => {

            let iteration = 1;
            let hits = randomNumber(1, 3);
            let interval = setInterval(() => {

              if (app.characters.self.isDead() || iteration >= hits) {
                return clearInterval(interval);
              }

              app.characters.self.getHurt(randomNumber(1, 3, true).toFixed(2));
              app.characters.self.displayCriticHit();

              iteration++;
            }, 1300);
          }
        },
        position: {
          left: {
            min: 5,
            max: 85
          },
          top: {
            min: 5,
            max: 80
          }
        },
        attackSpeed: 2500,
        autoAction: {
          fn: (self, target) => {

            if (!between(randomNumber(30, 60), 0, 100))
              return;

            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 1500
        }
      },
      {
        id: "shadow-head",
        name: "Biatak",
        class: "shadow-head",
        description: [
          "Encarnación de la sombra que conquista el monte.",
          "Es muy fuerte y resistente, aparte puede debilitarte haciendo que tus golpes sean casi nulos."
        ],
        health: 1200.00,
        strength: 345.00,
        criticAttackProbability: 65.00,
        special: {
          rate: {
            min: 20.00,
            max: 50.00
          },
          attack: self => {

            if(randomNumber(0,3) != 2)
              return;

            if(self.weak)
              return;

            self.weak = true;
            let previousStrength = app.characters.self.strength;
            app.characters.self.strength *= 0.10;

            setTimeout(() => {
              app.characters.self.strength = previousStrength;
              self.weak = false;
            }, 7000);
          }
        },
        position: {
          left: {
            min: 5,
            max: 70
          },
          top: {
            min: 0.00,
            max: 55.00
          }
        },
        attackSpeed: 3500,
        autoAction: {
          fn: (self, target) => {

            if (!between(randomNumber(30, 60), 0, 100))
              return;

            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 2500
        }
      },
      {
        id: "dragon",
        name: "Dragón",
        class: "dragon",
        description: [
          "Aumenta la temperatura a tu alrededor al punto de quemarte.",
          "Es un desgraciado dragón."
        ],
        health: 980.00,
        strength: 250.00,
        criticAttackProbability: -1,
        special: {
          rate: {
            min: 20.00,
            max: 70.00
          },
          attack: self => {

            app.characters.self.getHurt(randomNumber(self.strength * 1.3, self.strength * 3));
            app.characters.self.displayCriticHit();
          }
        },
        position: {
          left: {
            min: 5,
            max: 70
          },
          top: {
            min: 0.00,
            max: 45.00
          }
        },
        attackSpeed: 8500,
        autoAction: {
          fn: (self, target) => {

            if (!self.burning) {

              self.burning = true;

              let iteration = 1;
              let hits = randomNumber(2, 5);
              let interval = setInterval(() => {

                if (iteration >= hits || app.characters.self.isDead()) {
                  self.burning = false;
                  return clearInterval(interval);
                }

                app.characters.self.getHurt(randomNumber(12, 36));
                app.characters.self.displayCriticHit();

                iteration++;
              }, 3000);
            }

            self.component.generatePosition();
          },
          clear: self => {
            return self.isDead();
          },
          every: 2500
        }
      }
    ]) {
    let id = enemy.id;
    delete enemy.id;
    enemyTypes[id] = enemy;
  }

  Object.totalFreeze(enemyTypes);

  Vue.component("inventory", {
    data: () => {
      return {
        bag: {},
        style: "",
        type: "",
        withItems: false,
        class: ["item-box", "sombra"]
      }
    },
    template: `
      <div class="overlay" @click.self="closeWindow">
        <div :style="style" :class="getClass">
          <span class="closeButton" @click="closeWindow">x</span>
          <div class="layout-body">
            <div v-if="withItems">
              <div class="item-desc noselect" v-for="(value, idx) in bag" :key="idx" >
                <img @click="use(idx)" :src="itemIcon(idx)" :title="itemDesc(idx)" :alt="itemName(idx)">
                <span class="item-amount">&nbsp;{{value}}&nbsp;</span>
                <br>
                <span>{{itemName(idx)}}</span>
              </div>
            </div>
            <div v-else>
              <p>Tu inventario está vacío</p>
            </div>
          </div>
        </div>
      </div>
    `,
    methods: {
      closeWindow: function() {

        this.class.push("fadeOut");

        setTimeout(() => {
          this.class.pop();
          this.$root.showInventory = false;
        }, 250);

      },
      use: function(item) {
        this.$root.inventory.useItem(item, this.center);
        this.withItems = Object.keys(this.$root.inventory._bag).length > 0;
        this.center();
      },
      center: function() {
        return centerComponent(this, 100);
      },
      itemName: function(item) {
        return Items[item].name;
      },
      itemIcon: function(item) {
        return Items[item].icon;
      },
      itemDesc: function(item) {
        return Items[item].desc;
      }
    },
    computed: {
      getClass: function() {
        return this.class.join(" ")
      }
    },
    watch: {
      "$root.showInventory": function() {
        this.withItems = Object.keys(this.$root.inventory._bag).length > 0;
        this.center();
      },
      "$root.lifeBar": function(value) {
        if (value > 0.00)
          return;

        this.closeWindow();
      }
    },
    created: function() {
      window.addEventListener("resize", this.center);
    },
    mounted: function() {
      this.bag = this.$root.inventory._bag;
    },
    beforeDestroy: function() {
      window.removeEventListener("resize", this.center);
    }
  });

  Vue.component("alert-boxes", {
    props: ["alert_info"],
    template: `
        <div class="alert-holder">
          <alert-box v-for="(value, idx) in alert_info" :key="idx" :info="alert_info[idx]"></alert-box>
        </div>
      `
  });

  Vue.component("alert-box", {
    props: ["info"],
    data: () => {
      return {
        button: {
          ok: "Aceptar"
        },
        style: "",
        class: ["alert-box", "sombra"]
      }
    },
    template: `
        <div class="overlay">
          <div :style="style" :class="getClass">
            <p>{{info.text}}</p>
            <hr>
            <input type="button" :value="button.ok" @click="exeCallbacks">
          </div>
        </div>
      `,
    methods: {
      exeCallbacks: function() {

        if (typeof this.info.callbacks == "function") {
          this.info.callbacks();
        } else if (Array.isArray(this.info.callbacks)) {
          this.info.callbacks.forEach((callback, idx) => {

            if (typeof callback == "function")
              callback(idx);

          });
        }

        this.class.push("fadeOut");

        setTimeout(() => {
          this.$root.removeFromAlert(this.$vnode.key);
        }, 250);

      },
      center: function() {
        return centerComponent(this);
      }
    },
    computed: {
      getClass: function() {
        return this.class.join(" ");
      }
    },
    created: function() {
      window.addEventListener("resize", this.center);

      if (typeof this.info.button == "object" && !isEmpty(this.info.button.ok)) {
        this.button.ok = this.info.button.ok;
      }

      this.center();
    },
    beforeDestroy: function() {
      window.removeEventListener("resize", this.center);
    }
  });

  Vue.component("confirm-boxes", {
    props: ["confirm_info"],
    template: `
        <div class="confirm-holder">
          <confirm-box v-for="(value, idx) in confirm_info" :key="idx" :info="confirm_info[idx]"></confirm-box>
        </div>
      `
  });

  Vue.component("confirm-box", {
    props: ["info"],
    data: () => {
      return {
        button: {
          ok: "Aceptar",
          no: "Cancelar"
        },
        style: "",
        class: ["confirm-box", "sombra"]
      }
    },
    template: `
        <div class="overlay">
          <div :style="style" :class="getClass">
            <p>{{info.text}}</p>
            <hr>
            <input type="button" :value="button.ok" @click="exeCallbacks">
            <input type="button" :value="button.no" @click="cancel">
          </div>
        </div>
      `,
    methods: {
      cancel: function() {

        if (typeof this.info.callbacksOnCancel == "function") {
          this.info.callbacksOnCancel();
        } else if (Array.isArray(this.info.callbacksOnCancel)) {
          this.info.callbacksOnCancel.forEach((callback, idx) => {
            if (typeof callback == "function")
              callback(idx);
          });
        }

        this.quit();
      },
      quit: function() {

        let that = this;

        that.class.push("fadeOut");

        setTimeout(() => {
          that.$root.removeFromConfirm(that.$vnode.key);
        }, 250);

      },
      exeCallbacks: function() {

        if (typeof this.info.callbacks == "function") {
          this.info.callbacks();
        } else if (Array.isArray(this.info.callbacks)) {
          this.info.callbacks.forEach((callback, idx) => {
            if (typeof callback == "function")
              callback(idx);
          });
        }

        this.quit();
      },
      center: function() {
        return centerComponent(this);
      }
    },
    computed: {
      getClass: function() {
        return this.class.join(" ");
      }
    },
    created: function() {

      if (typeof this.info.button == "object") {

        if (!isEmpty(this.info.button.ok))
          this.button.ok = this.info.button.ok;

        if (!isEmpty(this.info.button.no))
          this.button.no = this.info.button.no;
      }

      window.addEventListener("resize", this.center);
      this.center();
    },
    beforeDestroy: function() {
      window.removeEventListener("resize", this.center);
    }
  });

  Vue.component("prompt-boxes", {
    props: ["prompt_info"],
    template: `
        <div class="prompt-holder">
          <prompt-box v-for="(value, idx) in prompt_info" :key="idx" :info="prompt_info[idx]"></prompt-box>
        </div>
      `
  });

  Vue.component("prompt-box", {
    props: ["info"],
    data: () => {
      return {
        button: {
          ok: "Aceptar",
          no: "Cancelar"
        },
        style: "",
        value: "",
        class: ["prompt-box", "sombra"]
      }
    },
    template: `
        <div class="overlay">
          <div :style="style" :class="getClass">
            <p>{{info.text}}</p>
            <hr>
            <input type="text" :maxlength="info.maxlength" v-model:value="value" :placeholder="info.placeholder" @keyup.enter="exeCallbacks">
            <hr>
            <input type="button" :value="button.ok" @click="exeCallbacks">
            <input type="button" :value="button.no" @click="cancel">
          </div>
        </div>
      `,
    methods: {
      cancel: function() {

        if (typeof this.info.callbacksOnCancel == "function") {

          this.info.callbacksOnCancel(this.value);
        } else if (Array.isArray(this.info.callbacksOnCancel)) {

          let that = this;

          this.info.callbacksOnCancel.forEach((callback, idx) => {
            if (typeof callback == "function")
              callback(that.value, idx);
          });
        }

        this.quit();
      },
      quit: function() {

        let that = this;

        that.class.push("fadeOut");

        setTimeout(() => {
          that.$root.removeFromPrompt(that.$vnode.key);
        }, 250);
      },
      exeCallbacks: function() {

        if (typeof this.info.callbacks == "function") {

          this.info.callbacks(this.value);
        } else if (Array.isArray(this.info.callbacks)) {

          let that = this;

          this.info.callbacks.forEach((callback, idx) => {
            if (typeof callback == "function")
              callback(that.value, idx);
          });
        }

        this.quit();
      },
      center: function() {
        return centerComponent(this);
      }
    },
    computed: {
      getClass: function() {
        return this.class.join(" ");
      }
    },
    created: function() {

      if (typeof this.info.button == "object") {

        if (!isEmpty(this.info.button.ok))
          this.button.ok = this.info.button.ok;

        if (!isEmpty(this.info.button.no))
          this.button.no = this.info.button.no;
      }

      window.addEventListener("resize", this.center);
      this.center();
    },
    beforeDestroy: function() {
      window.removeEventListener("resize", this.center);
    }
  });

  Vue.component("window-set", {
    props: ["info"],
    template: `
        <div class="windows-holder">
          <window v-for="(value, idx) in info" :key="idx" :info="value"></window>
        </div>`
  });

  Vue.component("window", {
    props: ["info"],
    data: () => {
      return {
        style: "",
        type: "",
        class: ["window-box", "sombra"],
        aceptedTypes: ["success", "error", "info"]
      }
    },
    template: `
        <div class="overlay" @click.self="closeWindow">
          <div :style="style" :class="getClass">
            <span class="closeButton" @click="closeWindow">x</span>
            <br v-if="info.title">
            <p v-if="info.title" class="windowTitle">{{info.title}}</p>
            <component v-if="inType" :is="windowType"></component>
            <div class="layout-body">
              <p v-for="(p, idx) in info.message" :key="idx">{{p}}</p>
            </div>
          </div>
        </div>
      `,
    methods: {
      closeWindow: function() {

        this.class.push("fadeOut");

        setTimeout(() => {

          this.$root.removeWindow(this.$vnode.key);

          if (typeof this.info.onRemove == "function") {

            this.info.onRemove();
          } else if (Array.isArray(this.info.onRemove)) {

            this.info.onRemove.forEach((callback, idx) => {
              if (typeof callback == "function")
                callback(idx);
            });
          }

        }, 250);

      },
      center: function() {
        return centerComponent(this);
      }
    },
    computed: {
      messageIsArray: function() {
        return typeof this.info.message == "object"
      },
      getClass: function() {
        return this.class.join(" ")
      },
      windowType: function() {
        return "animation-" + this.type;
      },
      inType: function() {
        return this.aceptedTypes.indexOf(this.type) > -1
      }
    },
    created: function() {
      window.addEventListener("resize", this.center);
      this.type = this.info.type;
      this.center();

      if (!isNaN(this.info.duration)) {
        setTimeout(() => {
          this.closeWindow();
        }, this.info.duration);
      }
    },
    beforeDestroy: function() {
      window.removeEventListener("resize", this.center);
    }
  });

  Vue.component("animation-success", {
    template: `<div class="animation-modal">
        <div class="animation-icon animation-success animate">
          <span class="animation-line animation-tip animateSuccessTip"></span>
          <span class="animation-line animation-long animateSuccessLong"></span>
          <div class="animation-placeholder"></div>
          <div class="animation-fixview"></div>
        </div>
      </div>`
  });

  Vue.component("animation-error", {
    template: `<div class="animation-modal">
        <div class="animation-icon animation-error animate">
          <span class="animation-xmark">
            <span class="animation-line animation-left animateXLeft"></span>
            <span class="animation-line animation-right animateXRight"></span>
          </span>
          <div class="animation-placeholder"></div>
          <div class="animation-fixview"></div>
        </div>
      </div>`
  });

  Vue.component("animation-info", {
    template: `<div class="animation-modal">
        <div class="animation-icon animation-warning scaleWarning">
          <span class="animation-body pulseWarningIns"></span>
          <span class="animation-dot pulseWarningIns"></span>
        </div>
      </div>`
  });

  Vue.component("background-image", {
    props: ["chapter_title", "background"],
    data: () => {
      return {
        hideBar: false,
        interval: null
      }
    },
    template: `<div :class="['background-stage', {'hurt': $root.isHurt && !$root.isCritical, 'big-hurt': $root.isCritical}]" :style="style">
      <enemies></enemies>
      <div ref="title" class="title sombra"><p>{{chapter_title}}</p></div>
    </div>`,
    computed: {
      style: function() {
        return "background-image: url('assets/img/scenario/" + this.background + "')";
      }
    },
    watch: {
      "chapter_title": function() {
        this.hideBar = false;
        setTimeout(() => {
          this.hideBar = true;
        }, 8 * 1000);
      },
      hideBar: function(value) {

        if (!isNaN(this.interval)) {
          clearInterval(this.interval);
        }

        let position = 0,
          setps = 30;

        if (!value) {

          this.$refs.title.setAttribute("style", "opacity: 0");

          this.interval = setInterval(() => {

            if (position >= setps) {
              clearInterval(this.interval);
              return;
            }

            position++;

            let opacity = (position / setps).toFixed(2);

            this.$refs.title.setAttribute("style", "opacity: " + opacity);
          }, 50);

          return;
        }

        this.interval = setInterval(() => {

          if (position >= setps) {
            setTimeout(() => {
              this.$refs.title.setAttribute("style", "display: none");
            }, 200);
            clearInterval(this.interval);
            return;
          }

          position++;

          let opacity = ((position / setps) - 1.00) * -1;

          this.$refs.title.setAttribute("style", "margin-top: -" + (position + 55) + "%; opacity: " + opacity);
        }, 50);
      }
    },
    mounted: function() {
      setTimeout(() => {
        this.hideBar = true;
      }, 8 * 1000);
    }
  });

  Vue.component("text-box", {
    props: ["info"],
    data: () => {
      return {
        message: "",
        showButtons: false,
        withButtons: false
      }
    },
    template: `<div class="text-box">
    <p>{{message}}</p>
    <div v-show="message.length < info.text.length" >
      <span>
        <input
          type="button"
          value="Skip" @click="message = info.text"
          style="float: right">
      </span>
      <br>
    </div>
    <div v-show="showButtons" :class="{center: withButtons}">
      <span v-if="withButtons">
        <input
          type="button"
          v-for="(value,idx) in info.decision"
          :value="value.text" @click="decision(value.action)"
          class="decision-buttons" />
        </span>
        <span v-else v-show="noEnemys">
          <input type="button" value=">>" @click="continuar" style="float: right">
        </span>
      <br>
    </div>
  </div>`,
    methods: {
      decision: function(action) {
        action(this);
      },
      continuar: function() {
        this.$root.navigateNext();
      },
      buttonHandler: function() {

        this.showButtons = false;

        if (this.info.decision && this.info.decision.length > 0) {
          this.withButtons = true;
        } else {
          this.withButtons = false;
        }
      },
      constructMessage: function() {

        this.message = "";

        this.buttonHandler();

        let textSpeed = 30;

        if (this.info.text.length > 300) {
          textSpeed = (textSpeed - (this.info.text.length / 13)).toFixed(0);
        }

        if (this.info.slowDown)
          textSpeed += this.info.slowDown;

        if (textSpeed < 3)
          textSpeed = 3;

        let i = 0,
          interval = setInterval(() => {

            if (this.message.length >= this.info.text.length) {
              this.showButtons = true;
              this.message = this.info.text;
              return clearInterval(interval);
            }

            this.message += this.info.text[i];
            this.$el.children[0].scroll(0, this.$el.children[0].scrollHeight);
            i++;
          }, textSpeed);
      }
    },
    computed: {
      noEnemys: function() {
        return this.$root.enemies.filter(value => value.display).length < 1
      }
    },
    watch: {
      "info.text": function() {
        this.constructMessage();
      }
    },
    mounted: function() {
      this.constructMessage();
    }
  });

  Vue.component("enemies", {
    template: `<div v-show="withEnemies" class="enemies-holder">
    <enemy v-for="(enemy, idx) in $root.enemies"
      v-if="enemy.display"
      :type="enemy.type" :key="idx"></enemy>
    </div>`,
    watch: {
      "withEnemies": function(value) {

        if (value)
          return;

        this.$root.enemies = [];
      }
    },
    computed: {
      withEnemies: function() {
        return this.$root.enemies.filter(value => value.display).length > 0
      }
    },
    mounted: function() {
      enemiesComponent = this;
    }
  });

  Vue.component("enemy", {
    props: ["type"],
    data: function() {
      return {
        classes: ["enemy", "noselect"],
        attack: null,
        looted: false,
        message: "",
        initiaPosition: undefined,
        individual: new Enemy(Object.assign({
          component: this
        }, enemyTypes[this.type])),
        left: 100,
        top: 100
      }
    },
    template: `<div :style="position" :class="classes.join(' ')">

      <div class="enemy-life">
        <div :class="['bar', {'border-alert':  lifeBar < 20.00}]">
          <p>{{life}}/{{maxLife}}</p>
          <div :class="{blinking: lifeBar < 20.00}" :style="'width: '+lifeBar+'%'">&nbsp;</div>
        </div>
      </div>

      <div @click="getHurt" :class="['noselect', 'enemy-figure', 'crosshair', individual.class, {'is-looted': looted}]" :alt="individual.name">
        <span v-if="looted" class="text-looted">
         Mio!
        </span>
        <span v-else>
          {{message}}
        </span>
      </div>
    </div>`,
    methods: {
      displayCriticHit: function(amount) {
        this.message = `x${amount}!`;
        setTimeout(() => this.message = "", 200);
      },
      displayMissHit: function() {
        this.message = "Miss!";
        setTimeout(() => this.message = "", 200);
      },
      shake: function() {
        let previous = this.left;
        this.left -= 3;
        setTimeout(() => {
          this.left = previous + 3;
          setTimeout(() => {
            this.left = this.initiaPosition.left;
          }, 75);
        }, 75);
      },
      getHurt: function() {
        this.$root.characters.self.attack(this);
        this.shake();
      },
      die: function() {

        this.$el.style.transform  = "rotate(-45deg)";

        setTimeout(() => {

          if (typeof this.individual.loot == "function" && this.individual.loot(this.$root.inventory)) {

            this.looted = true;

            setTimeout(() => {
              this.looted = false;
              this.classes.push("fadeOut");
              setTimeout(() => this.$root.enemies[this.$vnode.key].display = false, 200);
            }, 300);

            return;
          }

          this.classes.push("fadeOut");
          setTimeout(() => this.$root.enemies[this.$vnode.key].display = false, 200);

        }, 300);
      },
      chicken: function() {

        this.classes.push("fadeOut");
        this.individual.stopAutoAction = true;

        clearInterval(this.attack);
        this.attack = -1;

        setTimeout(() => this.$root.enemies[this.$vnode.key].display = false, 200);
      },
      generatePosition: function() {

        let left = {
            min: 5,
            max: 90
          },
          top = {
            min: 10,
            max: 85
          }

        if (typeof this.individual.position == "object") {
          left = this.individual.position.left;
          top = this.individual.position.top;
        }

        this.left = randomNumber(left.min, left.max, true).toFixed(2);
        this.top = randomNumber(top.min, top.max, true).toFixed(2);


        this.initiaPosition = {
          top: this.top,
          left: this.left
        }
      }
    },
    computed: {
      life: function() {
        return this.individual.health.toFixed(0);
      },
      maxLife: function() {
        return this.individual.maxHealth.toFixed(0);
      },
      lifeBar: function() {
        return ((this.individual.health / this.individual.maxHealth) * 100).toFixed(2);
      },
      position: function() {
        return `left: ${this.left}%; top: ${this.top}%;`;
      }
    },
    watch: {
      "individual.health": function(life) {

        if (!this.individual.isDead()) {
          return;
        }

        this.die();
      }
    },
    created: function() {
      this.generatePosition();

      setTimeout(() => {
        /**
        this.attack = setInterval(() => {

          if (this.individual.isDead() ||
            this.$root.characters.self.isDead()
            ) {
            clearInterval(this.attack);
            this.attack = -1;
            return;
          }

          this.individual.attack("self");

        }, this.individual.attackSpeed ? this.individual.attackSpeed : randomNumber(0.30, 3.50, true).toFixed(2) * 1000);
        /**/
      }, randomNumber(0.2, 2, true) * 1000)
    },
    beforeDestroy: function() {
      this.individual.stopAutoAction = true;

      if (this.attack > -1)
        clearInterval(this.attack);
    }
  });

  Vue.component("enemy-list", {
    data: () => {
      return {
        style: "",
        class: ["enemy-holder", "item-box", "sombra"]
      }
    },
    template: `
      <div class="overlay" @click.self="closeWindow">
        <div :style="style" :class="getClass">
          <span class="closeButton" @click="closeWindow">x</span>
          <br>
          <p class="windowTitle">Lista de enemigos</p>
          <hr>
          <div class="layout-body" style="height: 400px;">
            <div class="enemy-info" v-for="(enemy, idx) in list" :key="idx">
              <p>{{enemy.name}} [Vida: {{enemy.health}} - Fuerza: {{enemy.strength}}]</p>
              <div class="enemy-description">
                <p v-for="(message, idx) in enemy.description" :key="idx">{{message}}</p>
              </div>
              <div :class="['noselect', 'enemy-figure', 'center', enemy.class]">
                <span>&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    methods: {
      closeWindow: function() {

        this.class.push("fadeOut");

        setTimeout(() => {
          this.class.pop();
          this.$root.showEnemyList = false;
        }, 250);

      },
      center: function() {
        return centerComponent(this, 100);
      }
    },
    computed: {
      list: function() {

        let sortedEnemies = Object
          .keys(enemyTypes)
          .sort((enemy1, enemy2) => enemyTypes[enemy1].strength - enemyTypes[enemy2].strength);

        let enemies = {};

        for (let id of sortedEnemies) {
          enemies[id] = enemyTypes[id];
        }

        return enemies;
      },
      totalEnemies: function() {
        return Object.keys(this.list).length - 1;
      },
      getClass: function() {
        return this.class.join(" ")
      }
    },
    watch: {
      "$root.showEnemyList": function() {
        this.center();
      },
      "$root.lifeBar": function(value) {
        if (value > 0.00)
          return;

        this.closeWindow();
      }
    },
    created: function() {
      window.addEventListener("resize", this.center);
    },
    beforeDestroy: function() {
      window.removeEventListener("resize", this.center);
    }
  });

  const stage0 = [{
    from: "self",
    text: "",
    decision: [{
      text: "Iniciar una nueva partida",
      action: component => {
        component.$root.navigateNext();
        component.$root.saveGame();
      }
    }]
  }];

  const stage1 = [{
    from: "oskarye",
    text: "Hola...¿Estás seguro de lo que estás haciendo?",
    decision: [{
      text: "Si",
      action: component => {
        component.$root.navigateNext();
      }
    }, {
      text: "No",
      action: component => {
        component.$root.characters.oskarye.setAvatar("surprised");
        component.$root.navigateNext();
        setTimeout(component.$root.shakeAvatar, 500);
      }
    }]
  }, {
    from: "oskarye",
    text: `No te preocupes, cuando todo haya terminado verás como todo esto lucirá.
    No puedo esperar... jeje.`,
    callback: component => {

      component.characters.oskarye.setAvatar("normal");

      /**/
      component.spawnEnemies({
        "horse-barbarian": 3
      });
      /**/

    },
    slowDown: 15
  }, {
    from: "edil",
    text: "Oh, unos bandidos. Acaba con ellos para que entrenes."
  },{
    from: "self",
    showAvatar: false,
    text: "Vamos a terminar"
  }];

  const home = {
    title: "Bienvenido",
    scenario: [{
      stage: stage0,
      background: "title - copia.png"
    }]
  }

  const chapter1 = {
    title: "Capitulo uno: Una casa segura",
    scenario: [{
      stage: stage1,
      background: ""
    }]
  }

  const totalChapters = [
    home,
    chapter1
  ];

  const modifyScene = data => {

    if (typeof data != "object")
      return app.popWindow({
        type: "error",
        title: "Error de datos",
        message: ["La informacion de la escena es errornea"]
      });

    let idx = {
        chapter: parseInt(data.chapter),
        scenario: parseInt(data.scenario),
        stage: parseInt(data.stage)
      },
      forward = true;

    for (let i in idx) {
      if (isNaN(i) || i < 0) {
        forward = false;
        break;
      }
    }

    if (!forward)
      return app.popWindow({
        type: "error",
        title: "Error de datos",
        message: ["Indices erroneos"]
      });

    totalChapters[idx.chapter].scenario[idx.scenario].stage[idx.stage] = data.info;
  }

  /**
   * Data inicial
   */
  const mainData = {
    increaseStrength: 1,
    characters: {
      vinael: new Character({
        name: "Vinael",
        strength: 2.3,
        avatar: "vinael"
      }),
      edil: new Character({
        name: "Edil",
        strength: 1.3,
        avatar: "edil"
      }),
      unknown: new Character({}),
      self: Object.assign(new Character({
        name: "Joriel",
        strength: 3,
        criticAttackProbability: 0.04
      }), {
        displayMissHit: function() {

        },
        displayCriticHit: function(amount) {

          app.isHurt = false;
          app.isCritical = true;

          setTimeout(() => app.isCritical = false, 200);
        }
      }),
      oskarye: new Character({
        name: "Diosa del Conocimiento",
        strength: 4500,
        criticAttackProbability: 1.00,
        avatar: "knowlege-goddess"
      })
    },
    enemies: [],
    inventory: new Inventory(),
    index: {
      chapter: 0,
      stage: 0,
      scenario: 0
    }
  };
  const otherData = {
    showEnemyList: true,
    looted: false,
    shakeAvatarImage: false,
    isHurt: false,
    isCritical: false,
    mail: [
      "mailto:",
      "jormaneduardofernandez",
      "@gmail.com",
      "?Subject=Mt. Valare"
    ].join(""),
    time: "",
    showInventory: false,
    chapters: totalChapters,
    /**
     * Para colocar un alert-box, debe colocar en alertboxes
     * dentro del array objetos de la manera
     * [{
     *  text: "string",
     *  callbacks: () => console.log("done")
     * }]
     */
    alertboxes: [],
    /**
     * Para colocar un confirm-box, debe colocar en confirmboxes
     * dentro del array objetos de la manera
     * [{
     *  text: "string",
     *  callbacks: () => console.log("done"),
     *  callbacksOnCancel: () => console.log("not done")
     * }]
     */
    confirmboxes: [],
    /**
     * Para colocar un prompt-box, debe colocar en promptboxes
     * dentro del array objetos de la manera
     * [{
     *  text: "string",
     *  callbacks: value => console.log("input", value),
     *  maxlength: 13,
     *  placeholder: "some context",
     *  callbacksOnCancel: () => console.log("not done")
     * }]
     */
    promptboxes: [],
    windows: []
  }
  const keysToSave = Object.keys(mainData);


  /**
   * Variables a ser vigiladas y funciones a ser corridas
   */
  const watch = {}

  /**
   * Funciones internas a ser aplicadas en la aplicacion
   */
  const computedMethods = {
    lifePoints: function() {
      return Math.ceil(this.characters.self.health);
    },
    strength: function() {
      return this.characters.self.strength * this.increaseStrength;
    },
    lifeBar: function() {

      let lifebar = (this.characters.self.health / this.characters.self.maxHealth);
      lifebar *= 100;
      return lifebar.toFixed(2);
    },
    actualStage: function() {
      return this.chapters[this.index.chapter].scenario[this.index.scenario].stage[this.index.stage];
    },
    actualBackground: function() {
      return this.chapters[this.index.chapter].scenario[this.index.scenario].background;
    },
    withAlerts: function() {
      return this.alertboxes.length > 0;
    },
    withConfirms: function() {
      return this.confirmboxes.length > 0;
    },
    withPrompts: function() {
      return this.promptboxes.length > 0;
    },
    withWindows: function() {
      return this.windows.length > 0;
    }
  };

  /**
   * Metodos a ser asignados a la aplicacion
   */
  const methods = {
    shakeAvatar: function() {

      this.shakeAvatarImage = true;

      setTimeout(() => this.shakeAvatarImage = false, 500);
    },
    spawnEnemies: function(options) {

      for (let type in options) {

        if (typeof enemyTypes[type] != "object" ||
          (isNaN(options[type]) || options[type] < 1))
          continue;

        for (let i = 0; i < options[type]; i++) {
          this.enemies.push({
            type: type,
            display: true
          });
        }
      }
    },
    characterName: function(name) {
      return this.characters[name].name;
    },
    characterAvatar: function(name) {
      return this.characters[name].avatar.src;
    },
    navigateNext: function() {

      let chapter = this.index.chapter;
      let scenario = this.index.scenario;
      let stage = this.index.stage;

      if (stage < this.chapters[chapter].scenario[scenario].stage.length - 1) {
        stage++;
      } else {

        if (scenario < this.chapters[chapter].scenario.length - 1) {

          scenario++;
          stage = 0;
        } else {

          if (chapter >= this.chapters.length - 1) {
            return;
          }

          chapter++;
          scenario = 0;
          stage = 0;
        }
      }

      if(typeof this.actualStage.callback == "function") {
        this.actualStage.callback(this);
      }

      this.index.chapter = chapter;
      this.index.scenario = scenario;
      this.index.stage = stage;
    },
    saveGame: function(showPopUp) {

      let data = {};

      showPopUp = !showPopUp ? false : showPopUp;

      for (let idx of keysToSave) {

        if (typeof this[idx] == "undefined")
          continue;

        data[idx] = this[idx];
      }

      window.localStorage.setItem("savedGame", JSON.stringify(data));

      if (!showPopUp)
        return;

      this.popWindow({
        type: "success",
        title: "Juego salvado",
        message: ["El juego ha sido salvado exitosamente"],
        duration: 3000
      });
    },
    loadGame: function() {

      this.popWindow({
        type: "info",
        title: "Alerta",
        message: ["Aun no esta disponible cargar un juego salvado previamente"]
      });

      return;

      try {

        let savedData = JSON.parse(window.localStorage.getItem("savedGame"));

        if (keysToSave.toString() != Object.keys(savedData).reverse().toString()) {
          return this.popWindow({
            type: "info",
            title: "Opps, algo pasó",
            message: ["Parece que tu save data se ha corrompido", "Lo lamento :("]
          });
        }

      } catch (e) {
        return console.error("Error cargando punto de salvado: ", e);
      }

      this.popWindow({
        type: "success",
        title: "Exito",
        message: ["Juego cargado exitosamente"]
      });
    },
    /**
     * @param object options
     * {
     *  text: "string",
     *  callbacks: () => console.log("done")
     * }
     */
    doAlert: function(options) {

      if (typeof options != "object" || !options.text) {
        return this.alertboxes.push({
          text: "Opciones para la alerta son erradas"
        });
      }

      this.alertboxes.push(options);
    },
    removeFromAlert: function(idx) {
      this.alertboxes.splice(idx, 1);
    },
    /**
     * @param object options
     * {
     *  text: "string",
     *  callbacks: value => console.log("input", value),
     *  maxlength: 13,
     *  placeholder: "some context",
     *  callbacksOnCancel: () => console.log("not done")
     * }
     */
    doConfirm: function(options) {

      if (typeof options != "object" || !options.text) {
        return this.alertboxes.push({
          text: "Opciones para el confirm son erradas"
        });
      }

      this.confirmboxes.push(options);
    },
    removeFromConfirm: function(idx) {
      this.confirmboxes.splice(idx, 1);
    },
    /**
     * @param object options
     * {
     *  text: "string",
     *  callbacks: value => console.log("input", value),
     *  maxlength: 13,
     *  placeholder: "some context",
     *  callbacksOnCancel: () => console.log("not done")
     * }
     */
    doPrompt: function(options) {

      if (typeof options != "object" || !options.text) {
        return this.alertboxes.push({
          text: "Opciones para el promp son erradas"
        });
      }

      if (isNaN(options.maxlength)) {
        options.maxlength = null;
      }

      if (isEmpty(options.placeholder)) {
        options.placeholder = null;
      }

      this.promptboxes.push(options);
    },
    removeFromPrompt: function(idx) {
      this.promptboxes.splice(idx, 1);
    },
    /**
     * @param object options
     * {
     *  title: "string",
     *  message: "string",
     *  type: "string",
     *  duration: 123,
     *  onRemove: [() => {}]
     * }
     */
    popWindow: function(options) {

      if (typeof options != "object" || !options.type) {
        return this.doAlert({
          text: "Opciones para la ventana son erradas"
        });
      }

      this.windows.push(options);
    },
    removeWindow: function(idx) {
      this.windows.splice(idx, 1);
    }
  };

  /**
   * Estructuracion de la aplicacion
   */
  app = new Vue({
    el: "div#box",
    data: Object.assign(otherData, mainData),
    methods: methods,
    computed: computedMethods,
    watch: watch,
    mounted: function() {

      for (let item in Items) {
        this.inventory.Add(item, randomNumber(3, 7));
      }

      const clock = setInterval(() => {

        let time = new Date();

        let fecha = {
          diaSem: time.getDay(),
          diaMes: time.getDate(),
          mes: time.getMonth(),
          anio: time.getFullYear(),
          hora: time.getHours(),
          min: time.getMinutes(),
          seg: time.getSeconds(),
          ampm: "am"
        }

        if (fecha.hora > 11) {
          fecha.ampm = "pm";
        }

        if (fecha.hora > 12) {
          fecha.hora = fecha.hora - 12;
        }

        if (fecha.hora == 0) {
          fecha.hora = 12;
        }

        for (let idx of ["diaMes", "hora", "min", "seg"]) {
          if (fecha[idx] < 10) {
            fecha[idx] = "0" + fecha[idx];
          }
        }

        this.time = [
          "Es",
          dias[fecha.diaSem],
          fecha.diaMes,
          "de",
          meses[fecha.mes],
          fecha.anio < 2000 ? "de" : "del",
          fecha.anio,
          "-",
          [fecha.hora, ":", fecha.min, ":", fecha.seg, " ", fecha.ampm].join("")
        ].join(" ");

      }, 500);

      removeLoadingScreen();
    }
  });

});
