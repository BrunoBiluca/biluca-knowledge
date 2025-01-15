var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ScrollSpeed
});
var import_obsidian = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  speed: 5,
  altMultiplier: 5,
  enableAnimations: true
};
var ScrollSpeed = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.animationSmoothness = 3;
    this.positionY = 0;
    this.isMoving = false;
    this.scrollDistance = 0;
    this.windowOpenListener = (_win, window2) => {
      this.registerDomEvent(window2, "wheel", this.scrollListener, { passive: false });
    };
    this.scrollListener = (event) => {
      event.preventDefault();
      const path = event.path || event.composedPath && event.composedPath();
      for (const element of path) {
        if (this.isScrollable(element, event)) {
          this.target = element;
          if (this.isTrackPadUsed(event) || !this.settings.enableAnimations) {
            this.scrollWithoutAnimation(event);
          } else {
            this.scrollWithAnimation(event);
          }
          break;
        }
      }
    };
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new SettingsTab(this.app, this));
      this.registerDomEvent(window, "wheel", this.scrollListener, { passive: false });
      this.registerEvent(this.app.on("window-open", this.windowOpenListener));
    });
  }
  scrollWithoutAnimation(event) {
    const acceleration = event.altKey ? this.settings.speed * this.settings.altMultiplier : this.settings.speed;
    this.target.scrollBy(event.deltaX * acceleration, event.deltaY * acceleration);
  }
  scrollWithAnimation(event) {
    if (!this.isMoving) {
      this.positionY = this.target.scrollTop;
    }
    const acceleration = event.altKey ? Math.pow(this.settings.speed * this.settings.altMultiplier, 1.1) : Math.pow(this.settings.speed, 1.1);
    this.positionY += event.deltaY * acceleration;
    this.scrollDistance = event.deltaY * acceleration;
    this.positionY = Math.max(0, Math.min(this.positionY, this.target.scrollHeight - this.target.clientHeight));
    if (!this.isMoving) {
      this.isMoving = true;
      this.updateScrollAnimation();
    }
  }
  updateScrollAnimation() {
    if (!this.isMoving || !this.target) {
      return this.stopScrollAnimation();
    }
    const divider = Math.pow(this.animationSmoothness, 1.3);
    const delta = this.positionY - this.target.scrollTop;
    this.target.scrollTop += delta / divider;
    if (delta < 0 && this.positionY < 0 && this.target.scrollTop === 0) {
      return this.stopScrollAnimation();
    }
    if (delta > 0 && this.positionY > this.target.scrollHeight - this.target.clientHeight / 2 - this.scrollDistance) {
      return this.stopScrollAnimation();
    }
    if (Math.abs(delta) < this.scrollDistance * 0.015 || Math.abs(delta / divider) < 1) {
      return this.stopScrollAnimation();
    }
    window.requestAnimationFrame(this.updateScrollAnimation.bind(this));
  }
  stopScrollAnimation() {
    this.isMoving = false;
    this.scrollDistance = 0;
    this.positionY = this.target.scrollTop;
    if (this.target)
      this.target = void 0;
  }
  isScrollable(element, event) {
    const isHorizontal = event.deltaX && !event.deltaY;
    return this.isContentOverflowing(element, isHorizontal) && this.hasOverflowStyle(element, isHorizontal);
  }
  isContentOverflowing(element, horizontal) {
    const client = horizontal ? element.clientWidth : element.clientHeight;
    const scroll = horizontal ? element.scrollWidth : element.scrollHeight;
    return client < scroll;
  }
  hasOverflowStyle(element, horizontal) {
    const style = getComputedStyle(element);
    const overflow = style.getPropertyValue(horizontal ? "overflow-x" : "overflow-y");
    return /^(scroll|auto)$/.test(overflow);
  }
  isTrackPadUsed(event) {
    let isTrackPad = false;
    if (event.wheelDeltaY) {
      if (event.wheelDeltaY === event.deltaY * -3) {
        isTrackPad = true;
      }
    } else if (event.deltaMode === 0) {
      isTrackPad = true;
    }
    return isTrackPad;
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
var SettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    let speedSlider;
    new import_obsidian.Setting(containerEl).setName("Mouse Scroll Speed").setDesc("1 is the default scroll speed, higher is faster").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.speed = DEFAULT_SETTINGS.speed;
        speedSlider.setValue(DEFAULT_SETTINGS.speed);
        yield this.plugin.saveSettings();
      }));
    }).addSlider((slider) => {
      speedSlider = slider;
      slider.setValue(this.plugin.settings.speed).setLimits(0.1, 10, 0.1).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.speed = value;
        yield this.plugin.saveSettings();
      }));
    });
    let altMultiplierSlider;
    new import_obsidian.Setting(containerEl).setName("Alt Multiplier").setDesc("Multiply scroll speed when the ALT key is pressed").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.altMultiplier = DEFAULT_SETTINGS.altMultiplier;
        altMultiplierSlider.setValue(DEFAULT_SETTINGS.altMultiplier);
        yield this.plugin.saveSettings();
      }));
    }).addSlider((slider) => {
      altMultiplierSlider = slider;
      slider.setValue(this.plugin.settings.altMultiplier).setLimits(0.1, 10, 0.1).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.altMultiplier = value;
        yield this.plugin.saveSettings();
      }));
    });
    let animationToggle;
    new import_obsidian.Setting(containerEl).setName("Enable Animation").setDesc("Toggle smooth scrolling animations").addExtraButton((button) => {
      button.setIcon("reset").setTooltip("Restore default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.enableAnimations = DEFAULT_SETTINGS.enableAnimations;
        animationToggle.setValue(DEFAULT_SETTINGS.enableAnimations);
        yield this.plugin.saveSettings();
      }));
    }).addToggle((toggle) => {
      animationToggle = toggle;
      toggle.setValue(this.plugin.settings.enableAnimations).onChange((value) => __async(this, null, function* () {
        this.plugin.settings.enableAnimations = value;
        yield this.plugin.saveSettings();
      }));
    });
  }
};


/* nosourcemap */