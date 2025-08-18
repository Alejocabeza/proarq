"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordEmail = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("@react-email/components");
const ForgotPasswordEmail = ({ name, url, }) => {
    return (react_1.default.createElement(components_1.Html, null,
        react_1.default.createElement(components_1.Head, null),
        react_1.default.createElement(components_1.Preview, null, "Forgot Password ProArq SaaS"),
        react_1.default.createElement(components_1.Tailwind, null,
            react_1.default.createElement(components_1.Body, { className: "bg-white py-4" },
                react_1.default.createElement(components_1.Container, { className: "font-sans border bg-gray-100/30 rounded-lg shadow-md p-4" },
                    react_1.default.createElement(components_1.Section, { className: "flex justify-start items-center w-full" },
                        react_1.default.createElement(components_1.Heading, { className: "font-bold text-[1.5rem] flex justify-center items-center gap-2 " },
                            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className: "icon icon-tabler icons-tabler-outline icon-tabler-stack-2 bg-black text-white rounded p-1" },
                                react_1.default.createElement("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                                react_1.default.createElement("path", { d: "M12 4l-8 4l8 4l8 -4l-8 -4" }),
                                react_1.default.createElement("path", { d: "M4 12l8 4l8 -4" }),
                                react_1.default.createElement("path", { d: "M4 16l8 4l8 -4" })),
                            "ProArq SaaS")),
                    react_1.default.createElement(components_1.Hr, null),
                    react_1.default.createElement(components_1.Section, null,
                        react_1.default.createElement(components_1.Text, null,
                            "Hello ",
                            name,
                            "!"),
                        react_1.default.createElement(components_1.Text, null,
                            "Someone recently requested a password change for your",
                            ' ',
                            react_1.default.createElement("strong", null, "ProArq SaaS"),
                            " account. If this was you, you can set a new password here:"),
                        react_1.default.createElement(components_1.Button, { className: "bg-black p-2 text-white rounded", href: url }, "Reset Password"),
                        react_1.default.createElement(components_1.Text, null, "If you don't want to change your password or didn't request this, just ignore and delete this message."),
                        react_1.default.createElement(components_1.Text, null,
                            "To keep your account secure, please don't forward this email to anyone.",
                            ' '),
                        react_1.default.createElement(components_1.Text, null, "Happy journey!")))))));
};
exports.ForgotPasswordEmail = ForgotPasswordEmail;
exports.default = exports.ForgotPasswordEmail;
//# sourceMappingURL=forgot-password.email.js.map