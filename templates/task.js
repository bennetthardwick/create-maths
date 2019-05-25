module.exports.task = ({
  name,
  student,
  title,
  date,
  questions
}) =>
`\\documentclass{article}

\\usepackage[margin=0.8in]{geometry}
\\usepackage{amsmath,amsthm,amssymb}
\\usepackage{mathtools}
\\usepackage{enumitem}
\\usepackage{fancyhdr}
\\usepackage{graphicx}

\\DeclarePairedDelimiter\\abs{\\lvert}{\\rvert}%

\\newcommand{\\N}{\\mathbb{N}}
\\newcommand{\\R}{\\mathbb{R}}
\\newcommand{\\Z}{\\mathbb{Z}}

\\pagestyle{fancy}
\\fancyhead{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt} % no line in header area

\\fancyfoot[LE,RO]{\\thepage}
\\fancyfoot[RE,LO]{${name}${ student ? ` - ${student}` : ''}}

\\title{${title}}
\\date{May 28 2019}
\\author{${name}${ student ? `\\\\${student}` : ''}

\\begin{document}

  \\maketitle

  \\pagebreak

  ${(new Array(questions)).fill(0).map((_, i) => `\\input{./questions/q_${i + 1}}\n`)}

\\end{document}
`;
