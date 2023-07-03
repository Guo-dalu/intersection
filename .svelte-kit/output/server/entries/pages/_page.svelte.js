import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, j as compute_slots, g as getContext, v as validate_component, i as escape, d as escape_attribute_value, f as add_attribute, k as createEventDispatcher, o as onDestroy } from "../../chunks/ssr.js";
import { i as is_void, F as Frame, C as CloseButton, M as MIN_SIZE, a as MAX_SIZE, L as Label, T as TIPS, I as IntersectionWorker, E as ERROR_FLAG, G as GradientButton, H as Heading, P, b as CollectionRadio, A as Alert_1, c as Punchline, S as Spinner } from "../../chunks/CollectionRadio.js";
/* empty css                                                    */import { twMerge } from "tailwind-merge";
import { b as base } from "../../chunks/paths.js";
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
  let { tag = "div" } = $$props;
  let { show } = $$props;
  let { use = () => {
  } } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${show ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
});
function clampSize(s) {
  return s && s === "xs" ? "sm" : s === "xl" ? "lg" : s;
}
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _size;
  let $$restProps = compute_rest_props($$props, ["type", "value", "size", "defaultClass", "color", "floatClass"]);
  let $$slots = compute_slots(slots);
  let { type = "text" } = $$props;
  let { value = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { defaultClass = "block w-full disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
  let { color = "base" } = $$props;
  let { floatClass = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400" } = $$props;
  const borderClasses = {
    base: "border-gray-300 dark:border-gray-600",
    tinted: "border-gray-300 dark:border-gray-500",
    green: "border-green-500 dark:border-green-400",
    red: "border-red-500 dark:border-red-400"
  };
  const ringClasses = {
    base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
    green: "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
    red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
  };
  const colorClasses = {
    base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
    tinted: "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
    green: "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
    red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700"
  };
  let background = getContext("background");
  let group = getContext("group");
  const textSizes = {
    sm: "sm:text-xs",
    md: "text-sm",
    lg: "sm:text-base"
  };
  const leftPadding = { sm: "pl-9", md: "pl-10", lg: "pl-11" };
  const rightPadding = { sm: "pr-9", md: "pr-10", lg: "pr-11" };
  const inputPadding = { sm: "p-2", md: "p-2.5", lg: "p-3" };
  let inputClass;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.floatClass === void 0 && $$bindings.floatClass && floatClass !== void 0)
    $$bindings.floatClass(floatClass);
  _size = size || clampSize(group?.size) || "md";
  {
    {
      const _color = color === "base" && background ? "tinted" : color;
      inputClass = twMerge([
        defaultClass,
        $$slots.left && leftPadding[_size] || $$slots.right && rightPadding[_size] || inputPadding[_size],
        ringClasses[color],
        colorClasses[_color],
        borderClasses[_color],
        textSizes[_size],
        group || "rounded-lg",
        group && "first:rounded-l-lg last:rounded-r-lg",
        group && "border-l-0 first:border-l last:border-r",
        $$props.class
      ]);
    }
  }
  return `${validate_component(Wrapper, "Wrapper").$$render(
    $$result,
    {
      class: "relative w-full",
      show: $$slots.left || $$slots.right
    },
    {},
    {
      default: () => {
        return `${$$slots.left ? `<div class="${escape(twMerge(floatClass, $$props.classLeft), true) + " left-0 pl-2.5 pointer-events-none"}">${slots.left ? slots.left({}) : ``}</div>` : ``} ${slots.default ? slots.default({
          props: { ...$$restProps, class: inputClass }
        }) : ` <input${spread(
          [
            escape_object($$restProps),
            {
              class: escape_attribute_value(inputClass)
            }
          ],
          {}
        )}${add_attribute("value", value, 0)}> `} ${$$slots.right ? `<div class="${escape(twMerge(floatClass, $$props.classRight), true) + " right-0 pr-2.5"}">${slots.right ? slots.right({}) : ``}</div>` : ``}`;
      }
    }
  )} `;
});
const Helper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["helperClass", "color"]);
  let { helperClass = "text-xs font-normal text-gray-500 dark:text-gray-300" } = $$props;
  let { color = "gray" } = $$props;
  const colorClasses = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500"
  };
  if ($$props.helperClass === void 0 && $$bindings.helperClass && helperClass !== void 0)
    $$bindings.helperClass(helperClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `<p${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(helperClass, colorClasses[color], $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p> `;
});
const NumberInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  let { value = 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Input, "Input").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: ({ props }) => {
      return `<input${spread([escape_object(props), { type: "number" }], {})}${add_attribute("value", value, 0)}>`;
    }
  })} `;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "open",
    "title",
    "size",
    "placement",
    "autoclose",
    "permanent",
    "backdropClass",
    "defaultClass",
    "outsideclose"
  ]);
  let $$slots = compute_slots(slots);
  let { open = false } = $$props;
  let { title = "" } = $$props;
  let { size = "md" } = $$props;
  let { placement = "center" } = $$props;
  let { autoclose = false } = $$props;
  let { permanent = false } = $$props;
  let { backdropClass = "bg-gray-900 bg-opacity-50 dark:bg-opacity-80" } = $$props;
  let { defaultClass = "relative flex flex-col mx-auto" } = $$props;
  let { outsideclose = false } = $$props;
  const dispatch = createEventDispatcher();
  const getPlacementClasses = () => {
    switch (placement) {
      case "top-left":
        return ["justify-start", "items-start"];
      case "top-center":
        return ["justify-center", "items-start"];
      case "top-right":
        return ["justify-end", "items-start"];
      case "center-left":
        return ["justify-start", "items-center"];
      case "center":
        return ["justify-center", "items-center"];
      case "center-right":
        return ["justify-end", "items-center"];
      case "bottom-left":
        return ["justify-start", "items-end"];
      case "bottom-center":
        return ["justify-center", "items-end"];
      case "bottom-right":
        return ["justify-end", "items-end"];
      default:
        return ["justify-center", "items-center"];
    }
  };
  const sizes = {
    xs: "max-w-md",
    sm: "max-w-lg",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-7xl"
  };
  let frameClass;
  let backdropCls = twMerge(backdropClass, $$props.classBackdrop);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.autoclose === void 0 && $$bindings.autoclose && autoclose !== void 0)
    $$bindings.autoclose(autoclose);
  if ($$props.permanent === void 0 && $$bindings.permanent && permanent !== void 0)
    $$bindings.permanent(permanent);
  if ($$props.backdropClass === void 0 && $$bindings.backdropClass && backdropClass !== void 0)
    $$bindings.backdropClass(backdropClass);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.outsideclose === void 0 && $$bindings.outsideclose && outsideclose !== void 0)
    $$bindings.outsideclose(outsideclose);
  {
    dispatch(open ? "open" : "hide");
  }
  frameClass = twMerge(defaultClass, "w-full", $$props.class);
  return `${open ? ` <div${add_attribute("class", twMerge("fixed inset-0 z-40", backdropCls), 0)}></div>   <div${add_attribute("class", twMerge("fixed top-0 left-0 right-0 h-modal md:inset-0 md:h-full z-50 w-full p-4 flex", ...getPlacementClasses()), 0)} tabindex="-1" aria-modal="true" role="dialog"><div class="${"flex relative " + escape(sizes[size], true) + " w-full max-h-full"}"> ${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { rounded: true }, { shadow: true }, $$restProps, { class: frameClass }), {}, {
    default: () => {
      return ` ${$$slots.header || title ? `${validate_component(Frame, "Frame").$$render(
        $$result,
        {
          color: $$restProps.color,
          class: "flex justify-between items-center p-4 rounded-t border-b"
        },
        {},
        {
          default: () => {
            return `${slots.header ? slots.header({}) : ` <h3 class="${"text-xl font-semibold " + escape($$restProps.color ? "" : "text-gray-900 dark:text-white", true) + " p-0"}">${escape(title)}</h3> `} ${!permanent ? `${validate_component(CloseButton, "CloseButton").$$render(
              $$result,
              {
                name: "Close modal",
                color: $$restProps.color
              },
              {},
              {}
            )}` : ``}`;
          }
        }
      )}` : `${!permanent ? `${validate_component(CloseButton, "CloseButton").$$render(
        $$result,
        {
          name: "Close modal",
          class: "absolute top-3 right-2.5",
          color: $$restProps.color
        },
        {},
        {}
      )}` : ``}`}  <div class="p-6 space-y-6 flex-1 overflow-y-auto overscroll-contain" role="document">${slots.default ? slots.default({}) : ``}</div>  ${$$slots.footer ? `${validate_component(Frame, "Frame").$$render(
        $$result,
        {
          color: $$restProps.color,
          class: "flex items-center p-6 space-x-2 rounded-b border-t"
        },
        {},
        {
          default: () => {
            return `${slots.footer ? slots.footer({}) : ``}`;
          }
        }
      )}` : ``}`;
    }
  })}</div></div>` : ``} `;
});
const isSizeValid = (size, min = MIN_SIZE, max = MAX_SIZE) => {
  if (typeof size !== "number") {
    return false;
  }
  return Number.isInteger(size) && size >= min && size <= max;
};
const SizeInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let { size = 20 } = $$props;
  let { label = "" } = $$props;
  let { style = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    isValid = isSizeValid(size);
    $$rendered = `<div${add_attribute("class", style + " md:w-1/2 lg:w-1/3 font-light", 0)}>${validate_component(Label, "Label").$$render($$result, { for: label, class: "block mb-2" }, {}, {
      default: () => {
        return `${escape(label)}`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        "aria-label": label,
        id: label,
        type: "number",
        min: MIN_SIZE,
        max: MAX_SIZE,
        color: isValid ? "green" : "red",
        placeholder: TIPS,
        value: size
      },
      {
        value: ($$value) => {
          size = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${!isValid ? `${validate_component(Helper, "Helper").$$render($$result, { class: "mt-2", color: "red" }, {}, {
      default: () => {
        return `${escape(TIPS)}`;
      }
    })}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let size1 = 100;
  let size2 = 100;
  let iterateCollection = "A";
  let loaded = true;
  let hasAlert = false;
  let isModalOpen = false;
  let intersectionSize = 0;
  let computationTime = 200;
  let tips = "";
  let _worker;
  const unsubscribe = IntersectionWorker.subscribe((_Worker) => {
    if (!_Worker) {
      return;
    }
    _worker = new _Worker();
    _worker.onmessage = (e) => {
      if (e.data.message === ERROR_FLAG) {
        hasAlert = true;
        tips = "Error Happened from the Web Worker!";
        isModalOpen = false;
        loaded = true;
        return;
      }
      const { time, commonSize } = e.data.data;
      computationTime = time;
      intersectionSize = commonSize;
      loaded = true;
    };
  });
  onDestroy(() => {
    _worker?.terminate();
    unsubscribe();
  });
  const getOperation = (iterateCollection2, collection) => iterateCollection2 === collection ? "iterate" : "push into the Hash Set";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        outline: true,
        "aria-label": "deep into",
        color: "pinkToOrange",
        href: base + "/statistic",
        class: "mt-1 w-32"
      },
      {},
      {
        default: () => {
          return `Deep into →`;
        }
      }
    )} ${validate_component(Heading, "Heading").$$render(
      $$result,
      {
        tag: "h3",
        class: "font-light mt-12 mb-4 text-center"
      },
      {},
      {
        default: () => {
          return `Compute the Intersection of Collection A and Collection B`;
        }
      }
    )} ${validate_component(SizeInput, "SizeInput").$$render(
      $$result,
      {
        label: "Size of collection A",
        style: "mt-4 mx-auto",
        size: size1
      },
      {
        size: ($$value) => {
          size1 = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(SizeInput, "SizeInput").$$render(
      $$result,
      {
        label: "Size of collection B",
        style: "mt-4 mx-auto",
        size: size2
      },
      {
        size: ($$value) => {
          size2 = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(P, "P").$$render($$result, { class: "mt-4 font-light text-center" }, {}, {
      default: () => {
        return `Choose which collection to iterate`;
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
        class: "mt-4 font-bold w-20 block mx-auto",
        "aria-label": "run",
        shadow: true,
        disabled: isModalOpen,
        color: "pinkToOrange"
      },
      {},
      {
        default: () => {
          return `run`;
        }
      }
    )} ${validate_component(Alert_1, "Alert").$$render($$result, { hasAlert, tips }, {}, {})} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        autoclose: true,
        class: "py-4",
        open: isModalOpen
      },
      {
        open: ($$value) => {
          isModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Heading, "Heading").$$render($$result, { tag: "h5", class: "font-light" }, {}, {
            default: () => {
              return `With a collection A of size ${validate_component(Punchline, "Punchline").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(size1)}`;
                }
              })} to ${escape(getOperation(iterateCollection, "A"))} and a collection B of size
		${validate_component(Punchline, "Punchline").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(size2)}`;
                }
              })} to ${escape(getOperation(iterateCollection, "B"))}, the result would be...`;
            }
          })} ${loaded === false ? `${validate_component(Spinner, "Spinner").$$render($$result, { class: "mx-auto block" }, {}, {})}` : `${validate_component(P, "P").$$render($$result, {}, {}, {
            default: () => {
              return `The size of the intersection is ${validate_component(Punchline, "Punchline").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(intersectionSize)}`;
                }
              })}.`;
            }
          })} ${validate_component(P, "P").$$render($$result, {}, {}, {
            default: () => {
              return `And the computation takes ${validate_component(Punchline, "Punchline").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(computationTime)} ms`;
                }
              })}.`;
            }
          })}`}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
