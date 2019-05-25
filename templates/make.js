module.exports.make = ({ title, name }) =>
`default:
\tpdflatex --jobname="${title} - ${name}" task.tex
`;
