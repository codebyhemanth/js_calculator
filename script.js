function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Calculator extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      firstVal: '',
      secondVal: '',
      operator: '',
      display: '0' });_defineProperty(this, "keypressHandler",









    ev => {
      const {
        setNumberValue,
        setOperatorValue,
        equalHandler,
        allClear,
        deleteChar } =
      this;
      const {
        operator,
        secondVal } =
      this.state;
      const numRegex = /^([0-9]|\.)*$/g;
      const opRegex = /[+|\-|:|*]/g;
      const eqRegex = /(=)/g;
      const delRegex = /(Backspace|Delete)/g;
      const acRegex = /(Escape)/g;
      const key = ev.key;

      const isNumber = !!numRegex.exec(key);
      const isOperator = !!opRegex.exec(key);
      const isEqual = !!eqRegex.exec(key);
      const isDel = !!delRegex.exec(key);
      const isAc = !!acRegex.exec(key);

      if (key && isNumber) {
        setNumberValue(key + '');
      }

      if (key && isOperator) {
        setOperatorValue(key + '');
      }

      if (key && isEqual) {
        equalHandler();
      }

      if (key && isDel) {
        deleteChar();
      }

      if (key && isAc) {
        allClear();
      }
    });_defineProperty(this, "resetState",

    resetAll => {
      if (resetAll) {
        this.setState({
          firstVal: '',
          secondVal: '',
          operator: '',
          display: '0' });

      } else {
        this.setState({
          firstVal: '',
          secondVal: '',
          operator: '' });

      }
    });_defineProperty(this, "hasPoint",

    value => {
      return value.indexOf('.') > -1;
    });_defineProperty(this, "setNumberValue",

    value => {
      const {
        firstVal,
        secondVal,
        operator } =
      this.state;
      const {
        fixNumberString,
        setDisplay } =
      this;
      let total;

      // if point is pressed, check if we already have it in current states
      if (value === '.') {
        if (!operator && !this.hasPoint(firstVal)) {
          total = fixNumberString(firstVal + value);
          this.setState({
            firstVal: total });

        }
        if (!!operator && !this.hasPoint(secondVal)) {
          total = fixNumberString(secondVal + value);
          this.setState({
            secondVal: total });

        }
        if (total) {
          setDisplay(total + '');
        }
        return;
      }

      // if input is a number, check if it's first or second number
      if (!operator) {
        total = fixNumberString(firstVal + value);
        this.setState({
          firstVal: total });

      } else {
        total = fixNumberString(secondVal + value);
        this.setState({
          secondVal: total });

      }
      setDisplay(total + '');
    });_defineProperty(this, "getOverall",

    () => {
      const {
        firstVal,
        secondVal,
        operator } =
      this.state;
      return firstVal + ' ' + operator + ' ' + secondVal;
    });_defineProperty(this, "setDisplay",

    value => {
      const {
        firstVal,
        secondVal } =
      this.state;

      this.setState({
        display: value });

    });_defineProperty(this, "getCurrentTargetValue",

    () => {
      const {
        firstVal,
        secondVal,
        operator } =
      this.state;
      return !operator ? firstVal : secondVal;
    });_defineProperty(this, "numberClickHandler",

    e => {
      const value = e.target.innerHTML;
      if (value) {
        this.setNumberValue(value);
      }
    });_defineProperty(this, "setOperatorValue",

    operatorInput => {
      const {
        firstVal,
        secondVal,
        operator,
        display } =
      this.state;
      const {
        fixNumberString,
        calculate,
        setDisplay } =
      this;
      const fixedNumber = fixNumberString(firstVal, false);

      if (firstVal && !secondVal) {
        this.setState({
          operator: operatorInput,
          display: fixedNumber });

      } else if (firstVal && operator && secondVal) {
        const total = calculate();
        this.setState({
          operator: operatorInput,
          firstVal: total + '',
          secondVal: '' });

        setDisplay(total + '');
      } else {
        this.setState({
          operator: operatorInput,
          firstVal: fixNumberString(display, false) });

      }
    });_defineProperty(this, "operatorClickHandler",

    e => {
      const { setOperatorValue } = this;
      const operatorInput = e.target.innerHTML;

      setOperatorValue(operatorInput);
    });_defineProperty(this, "allClear",

    () => {
      this.resetState(true);
    });_defineProperty(this, "deleteChar",

    () => {
      const {
        firstVal,
        secondVal,
        operator } =
      this.state;
      const opRegex = /[+|\-|:|*]/g;

      if (!operator) {
        const newVal = firstVal.slice(0, -1);
        this.setState({
          firstVal: newVal,
          display: newVal ? newVal : '0' });

      } else if (operator && !secondVal) {
        this.setState({
          display: firstVal,
          operator: '' });

      } else {
        const newVal = secondVal.slice(0, -1);
        this.setState({
          secondVal: newVal,
          display: newVal ? newVal : '0' });

      }
    });_defineProperty(this, "removeZeroAtStart",

    value => {
      return value.indexOf('0') === 0 ? value.substring(1) : value;
    });_defineProperty(this, "fixNumberString",

    (value, finalize = false) => {
      // if input has hanging point e.g. '0.'/'1.', add trailing zero
      // should only run when moving to second value / begin calculation
      if (finalize && value.indexOf('.') === value.length - 1 && value.length > 1) {
        return value + '0';
      }
      // if value has zero prefix but not a decimal value, e.g. '01'/'03', remove zero
      if (value.indexOf('0') === 0 && !value.indexOf('0.') === 0) {
        return value.substring(1);
      }
      // if value is a first point input '.', add zero prefix
      if (value.indexOf('.') === 0 && value.length === 1) {
        return '0.';
      }
      if (!value) {
        return '0';
      }
      return value;
    });_defineProperty(this, "calculate",

    () => {
      const {
        firstVal,
        secondVal,
        operator } =
      this.state;
      const {
        fixNumberString } =
      this;

      const vfirstVal = fixNumberString(firstVal, true);
      const vsecondVal = fixNumberString(secondVal, true);
      let total = '0';

      switch (operator) {
        case '-':
          total = parseFloat(vfirstVal) - parseFloat(vsecondVal);
          break;
        case '*':
          total = parseFloat(vfirstVal) * parseFloat(vsecondVal);
          break;
        case ':':
          total = parseFloat(vfirstVal) / parseFloat(vsecondVal);
          break;
        case '+':
        default:
          total = parseFloat(vfirstVal) + parseFloat(vsecondVal);
          break;}


      return total.toLocaleString();
    });_defineProperty(this, "equalHandler",

    () => {
      const {
        firstVal,
        secondVal,
        operator } =
      this.state;
      const {
        setDisplay,
        resetState,
        calculate } =
      this;

      if (firstVal && secondVal && operator) {
        let total = calculate();
        setDisplay(total + '');
        resetState();
      }
    });}componentDidMount() {const { keypressHandler } = this;document.addEventListener('keyup', ev => {keypressHandler(ev);});}

  render() {
    const {
      display,
      operator } =
    this.state;
    const {
      operatorClickHandler,
      numberClickHandler,
      deleteChar,
      allClear,
      equalHandler,
      getOverall } =
    this;
    const activeOperator = name => {
      return operator === name ? 'active' : '';
    };
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "display" },
      React.createElement("p", { className: "display-overall" }, getOverall().trim()),
      React.createElement("p", { className: "display-text" }, display)),

      React.createElement("div", { className: "inputs" },
      React.createElement("div", { className: "column main" },
      React.createElement("div", { className: "operator" },
      React.createElement("div", { className: "row" },
      React.createElement("button", {
        className: activeOperator('+'),
        onClick: operatorClickHandler }, "+"),
      React.createElement("button", {
        className: activeOperator('-'),
        onClick: operatorClickHandler }, "-"),
      React.createElement("button", {
        className: activeOperator(':'),
        onClick: operatorClickHandler }, ":"),
      React.createElement("button", {
        className: activeOperator('*'),
        onClick: operatorClickHandler }, "*"))), " ",


      React.createElement("div", { className: "numbers" },
      React.createElement("div", { className: "row" },
      React.createElement("button", { onClick: numberClickHandler }, "1"),
      React.createElement("button", { onClick: numberClickHandler }, "2"),
      React.createElement("button", { onClick: numberClickHandler }, "3")),

      React.createElement("div", { className: "row" },
      React.createElement("button", { onClick: numberClickHandler }, "4"),
      React.createElement("button", { onClick: numberClickHandler }, "5"),
      React.createElement("button", { onClick: numberClickHandler }, "6")),

      React.createElement("div", { className: "row" },
      React.createElement("button", { onClick: numberClickHandler }, "7"),
      React.createElement("button", { onClick: numberClickHandler }, "8"),
      React.createElement("button", { onClick: numberClickHandler }, "9")),

      React.createElement("div", { className: "row" },
      React.createElement("button", { onClick: numberClickHandler }, "."),
      React.createElement("button", { onClick: numberClickHandler }, "0"),
      React.createElement("button", { onClick: deleteChar }, "C"))), " "), " ",



      React.createElement("div", { className: "column sides" },
      React.createElement("button", { className: "ac", onClick: allClear }, "AC"),
      React.createElement("button", { className: "equal", onClick: equalHandler }, "=")), " "), " "));




  }}


ReactDOM.render(
React.createElement(Calculator, null),
document.getElementById('root'));