module.exports.question = ({ number }) =>
`\\section*{Question ${number}}

\\begin{enumerate}[label=\\alph*)]
  \\item
    This is the beginning of question ${number}.
    \\begin{align*}
      2 + 2 - 1 &= 4 - 1 \\\\
        &= 3 \\\\
        &= QUICK MATHS
    \\end{align*}
    \\begin{center}
      \\fbox{\\includegraphics[width=0.6\\textwidth]{graphs/example-sketch.png}}
    \\end{center}
\\end{enumerate}
`;
