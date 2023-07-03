import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, f as add_attribute, j as compute_slots, v as validate_component, i as escape } from "../../../chunks/ssr.js";
import { I as IntersectionWorker, E as ERROR_FLAG, G as GradientButton, H as Heading, P, c as Punchline, b as CollectionRadio, S as Spinner, A as Alert_1, d as STATISTIC_MIN_SIZE, e as STATISTIC_MAX_SIZE, f as EXPERIMENT_TIMES } from "../../../chunks/CollectionRadio.js";
/* empty css                                                       */import { twMerge } from "tailwind-merge";
import { b as base } from "../../../chunks/paths.js";
const Hr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["icon", "divClass", "hrClass", "iconDivClass", "textSpanClass", "innerDivClass"]);
  let $$slots = compute_slots(slots);
  let { icon = false } = $$props;
  let { divClass = "inline-flex justify-center items-center w-full" } = $$props;
  let { hrClass = "w-full h-px bg-gray-200 rounded border-0 dark:bg-gray-700" } = $$props;
  let { iconDivClass = "absolute left-1/2 px-4 bg-white -translate-x-1/2 " } = $$props;
  let { textSpanClass = "absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white " } = $$props;
  let { innerDivClass = "dark:bg-gray-900" } = $$props;
  let horizontalCls = twMerge(hrClass, $$props.classHr);
  let divCls = twMerge(divClass, $$slots && "relative", $$props.classDiv);
  let innerDivCls = twMerge(innerDivClass, icon ? iconDivClass : textSpanClass, $$props.classInnerDiv);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.hrClass === void 0 && $$bindings.hrClass && hrClass !== void 0)
    $$bindings.hrClass(hrClass);
  if ($$props.iconDivClass === void 0 && $$bindings.iconDivClass && iconDivClass !== void 0)
    $$bindings.iconDivClass(iconDivClass);
  if ($$props.textSpanClass === void 0 && $$bindings.textSpanClass && textSpanClass !== void 0)
    $$bindings.textSpanClass(textSpanClass);
  if ($$props.innerDivClass === void 0 && $$bindings.innerDivClass && innerDivClass !== void 0)
    $$bindings.innerDivClass(innerDivClass);
  return `${$$slots ? `<div${spread([escape_object($$restProps), { class: escape_attribute_value(divCls) }], {})}><hr${add_attribute("class", horizontalCls, 0)}> <div${add_attribute("class", innerDivCls, 0)}>${slots.default ? slots.default({}) : ``}</div></div>` : `<hr${add_attribute("class", horizontalCls, 0)}>`} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let iterateCollection;
  let times = EXPERIMENT_TIMES;
  let loaded = true;
  let hasAlert = false;
  let intersectionList = [];
  let _worker = null;
  let plotElement2D;
  let plotElement3D;
  const messageHandler = (e) => {
    if (e.data.message === ERROR_FLAG) {
      hasAlert = true;
      loaded = true;
      return;
    }
    intersectionList = e.data.data;
    intersectionList.map((v) => v.time);
    intersectionList.map((v) => v.size1 + v.size2);
    intersectionList.map((v) => v.size1);
    intersectionList.map((v) => v.size2);
    loaded = true;
  };
  IntersectionWorker.subscribe((_Worker) => {
    if (!_Worker) {
      return;
    }
    _worker = new _Worker();
    _worker.onmessage = messageHandler;
  });
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        outline: true,
        "aria-label": "go back",
        color: "pinkToOrange",
        href: base + "/",
        class: "mt-1 w-32"
      },
      {},
      {
        default: () => {
          return `Go back ←`;
        }
      }
    )} ${validate_component(Heading, "Heading").$$render(
      $$result,
      {
        tag: "h3",
        class: "font-light text-center mt-9"
      },
      {},
      {
        default: () => {
          return `Now let&#39;s try some fancy things!`;
        }
      }
    )} ${validate_component(P, "P").$$render($$result, { class: "text-center mt-6 text-lg" }, {}, {
      default: () => {
        return `We will randomly assign sizes between ${validate_component(Punchline, "Punchline").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(STATISTIC_MIN_SIZE)} and ${escape(STATISTIC_MAX_SIZE)}`;
          }
        })} to Collection A and Collection B`;
      }
    })} ${validate_component(P, "P").$$render($$result, { class: "mt-4 text-lg text-center" }, {}, {
      default: () => {
        return `You would choose which collection to iterate`;
      }
    })} ${validate_component(CollectionRadio, "CollectionRadio").$$render(
      $$result,
      { iterateCollection },
      {
        iterateCollection: ($$value) => {
          iterateCollection = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        class: "mt-4 font-bold block mx-auto",
        "aria-label": "run",
        shadow: true,
        color: "pinkToOrange",
        disabled: !loaded
      },
      {},
      {
        default: () => {
          return `And run the experiment ${escape(times)} times!`;
        }
      }
    )} ${validate_component(P, "P").$$render(
      $$result,
      {
        class: "text-center mt-4 mb-6 font-light text-lg"
      },
      {},
      {
        default: () => {
          return `The result will be...`;
        }
      }
    )} ${!loaded && intersectionList.length === 0 ? `${validate_component(Spinner, "Spinner").$$render($$result, { class: "block mx-auto w-16 h-16" }, {}, {})}` : ``} <div class="overflow-hidden"${add_attribute("this", plotElement2D, 0)}></div> ${validate_component(Hr, "Hr").$$render($$result, { hrClass: "my-2" }, {}, {})} <div${add_attribute("this", plotElement3D, 0)}></div> ${validate_component(Alert_1, "Alert").$$render($$result, { hasAlert }, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
