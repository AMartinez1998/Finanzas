import { useState } from "react";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function FinanceApp({ onLogout }) {
  // Inputs para salario e ingresos extras
  const [incomeInput, setIncomeInput] = useState(
    localStorage.getItem("income") || "0"
  );
  const [extraInput, setExtraInput] = useState(
    localStorage.getItem("extraIncome") || "0"
  );

  // Valores guardados para resumen
  const [savedIncome, setSavedIncome] = useState(Number(localStorage.getItem("income")) || 0);
  const [savedExtraIncome, setSavedExtraIncome] = useState(Number(localStorage.getItem("extraIncome")) || 0);

  // Estado de gastos
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || []);
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Guardar ingresos
  const handleSaveIncome = () => {
    const incomeNum = Number(incomeInput) || 0;
    const extraNum = Number(extraInput) || 0;

    localStorage.setItem("income", incomeNum);
    localStorage.setItem("extraIncome", extraNum);

    setSavedIncome(incomeNum);
    setSavedExtraIncome(extraNum);

    // Limpiar inputs
    setIncomeInput("");
    setExtraInput("");

    alert("✅ Ingresos guardados");
  };

  // Añadir gasto
  const handleAddExpense = () => {
    if (expenseDesc.trim() !== "" && expenseAmount > 0) {
      const newExpenses = [
        ...expenses,
        { desc: expenseDesc, amount: Number(expenseAmount) },
      ];
      setExpenses(newExpenses);
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
      setExpenseDesc("");
      setExpenseAmount("");
    } else {
      alert("⚠️ Introduce una descripción y una cantidad válida");
    }
  };

  // Reset financiero
  const handleResetFinancials = () => {
    if (window.confirm("⚠️ ¿Seguro que quieres borrar todos los datos financieros?")) {
      localStorage.removeItem("income");
      localStorage.removeItem("extraIncome");
      localStorage.removeItem("expenses");

      setIncomeInput("0");
      setExtraInput("0");
      setSavedIncome(0);
      setSavedExtraIncome(0);
      setExpenses([]);
      setExpenseDesc("");
      setExpenseAmount("");
    }
  };

  // Cálculos
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = savedIncome + savedExtraIncome - totalExpenses;

  // Datos para gráficos
  const barData = [
    { name: "Ingresos", value: savedIncome + savedExtraIncome },
    { name: "Gastos", value: totalExpenses },
    { name: "Balance", value: balance },
  ];

  const pieData = expenses.map((exp) => ({
    name: exp.desc,
    value: exp.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#FF6384"];

  return (
    <div className="app-container">
      {/* Botón reset financiero */}
      <button className="auth-button reset fixed-reset" onClick={handleResetFinancials}>
        Borrar datos financieros
      </button>

      <div className="finance-container">
        {/* Izquierda: Inputs, botones, lista de gastos */}
        <div className="left-panel">
          <h2 className="auth-title">💰 Finanzas Personales</h2>

          {/* Salario */}
          <div className="input-group">
            <label>💵 Salario</label>
            <input
              type="number"
              className="auth-input"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              onFocus={() => incomeInput === "0" && setIncomeInput("")}
            />
          </div>

          {/* Ingresos extras */}
          <div className="input-group">
            <label>➕ Ingresos extras</label>
            <input
              type="number"
              className="auth-input"
              value={extraInput}
              onChange={(e) => setExtraInput(e.target.value)}
              onFocus={() => extraInput === "0" && setExtraInput("")}
            />
          </div>

          <button className="auth-button login" onClick={handleSaveIncome}>
            Guardar ingresos
          </button>

          {/* Nuevo gasto */}
          <div className="input-group">
            <label>💸 Nuevo gasto</label>
            <input
              type="text"
              placeholder="Ej: Pipas Tijuana"
              className="auth-input"
              value={expenseDesc}
              onChange={(e) => setExpenseDesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad (€)"
              className="auth-input"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
            <button className="auth-button register" onClick={handleAddExpense}>
              Añadir gasto
            </button>
          </div>

          {/* Lista de gastos */}
          <h3 className="auth-title">📋 Gastos</h3>
          <ul>
            {expenses.map((exp, i) => (
              <li key={i}>
                {exp.desc} — <strong>{exp.amount}€</strong>
              </li>
            ))}
          </ul>

          {/* Resumen */}
          <h3 className="auth-title">📊 Resumen</h3>
          <p>💵 Ingresos: {savedIncome + savedExtraIncome}€</p>
          <p>💸 Gastos: {totalExpenses}€</p>
          <p>✅ Balance: {balance}€</p>

          {/* Logout */}
          <button className="auth-button logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>

        {/* Derecha: Gráficos */}
        <div className="right-panel">
          {/* Gráfico de barras */}
          <h3 className="auth-title">📈 Gráfico de Ingresos/Gastos/Balance</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de pastel */}
          {pieData.length > 0 && (
            <>
              <h3 className="auth-title">🥧 Distribución de Gastos</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
