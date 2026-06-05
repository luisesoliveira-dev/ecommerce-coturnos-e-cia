import { useState } from "react";
import { MoveRight, Info } from "lucide-react";
import { InputSenha } from "./InputSenha";
import { InputCampo } from "./InputCampo";
import { BotaoBordaDupla } from "./BotaoBordaDupla";
import { BotaoSocial } from "./BotaoSocial";

// ---------- máscaras ----------
function mascaraCPF(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length > 9)
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  if (v.length > 3) return v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  return v;
}

function mascaraCelular(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length > 7) return v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  if (v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  return v;
}

function mascaraData(v) {
  v = v.replace(/\D/g, "").slice(0, 8);
  if (v.length > 4) return v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
  if (v.length > 2) return v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  return v;
}

// ---------- validações ----------
function validarEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validarSenha(senha) {
  return senha.length >= 8 && /[A-Z]/.test(senha) && /[^A-Za-z0-9]/.test(senha);
}

function validarCPF(cpf) {
  return cpf.replace(/\D/g, "").length === 11;
}

function validarCelular(cel) {
  return cel.replace(/\D/g, "").length === 11;
}

function validarData(data) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
  const [dia, mes, ano] = data.split("/").map(Number);
  const d = new Date(ano, mes - 1, dia);
  if (
    d.getDate() !== dia ||
    d.getMonth() !== mes - 1 ||
    d.getFullYear() !== ano
  )
    return false;
  const hoje = new Date();
  const idade =
    hoje.getFullYear() -
    ano -
    (hoje < new Date(hoje.getFullYear(), mes - 1, dia) ? 1 : 0);
  return idade >= 16 && idade <= 110;
}

export function LoginCadastro() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginForm, setLoginForm] = useState({ email: "", senha: "" });
  const [loginErros, setLoginErros] = useState({});

  const [cadastroForm, setCadastroForm] = useState({
    nome: "",
    cpf: "",
    celular: "",
    email: "",
    nascimento: "",
    senha: "",
    confirmaSenha: "",
    termos: false,
  });
  const [cadastroErros, setCadastroErros] = useState({});

  // ---------- LOGIN ----------
  function handleLoginChange(campo, valor) {
    setLoginForm((prev) => ({ ...prev, [campo]: valor }));
    if (loginErros[campo]) setLoginErros((prev) => ({ ...prev, [campo]: "" }));
  }

  function validarLogin() {
    const erros = {};
    if (!loginForm.email) erros.email = "Informe seu e-mail.";
    else if (!validarEmail(loginForm.email)) erros.email = "E-mail inválido.";
    if (!loginForm.senha) erros.senha = "Informe sua senha.";
    return erros;
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const erros = validarLogin();
    if (Object.keys(erros).length > 0) {
      setLoginErros(erros);
      return;
    }
    console.log("Login enviado:", loginForm); // TODO: chamar API
  }

  // ---------- CADASTRO ----------
  function handleCadastroChange(campo, valor) {
    // aplica máscara conforme o campo
    let valorFinal = valor;
    if (campo === "cpf") valorFinal = mascaraCPF(valor);
    if (campo === "celular") valorFinal = mascaraCelular(valor);
    if (campo === "nascimento") valorFinal = mascaraData(valor);

    setCadastroForm((prev) => ({ ...prev, [campo]: valorFinal }));
    if (cadastroErros[campo])
      setCadastroErros((prev) => ({ ...prev, [campo]: "" }));
  }

  function validarCadastro() {
    const erros = {};
    const f = cadastroForm;

    if (!f.nome.trim() || f.nome.trim().split(" ").filter(Boolean).length < 2)
      erros.nome = "Informe nome e sobrenome.";

    if (!f.cpf) erros.cpf = "Informe seu CPF.";
    else if (!validarCPF(f.cpf)) erros.cpf = "CPF incompleto.";

    if (!f.celular) erros.celular = "Informe seu celular.";
    else if (!validarCelular(f.celular)) erros.celular = "Celular incompleto.";

    if (!f.email) erros.email = "Informe seu e-mail.";
    else if (!validarEmail(f.email)) erros.email = "E-mail inválido.";

    if (!f.nascimento) erros.nascimento = "Informe sua data de nascimento.";
    else if (!validarData(f.nascimento))
      erros.nascimento = "Data inválida ou idade não permitida.";

    if (!f.senha) erros.senha = "Crie uma senha.";
    else if (!validarSenha(f.senha))
      erros.senha = "Mínimo 8 caracteres, 1 maiúscula e 1 especial.";

    if (!f.confirmaSenha) erros.confirmaSenha = "Confirme sua senha.";
    else if (f.senha !== f.confirmaSenha)
      erros.confirmaSenha = "As senhas não coincidem.";

    if (!f.termos) erros.termos = "Você precisa aceitar os termos.";

    return erros;
  }

  function handleCadastroSubmit(e) {
    e.preventDefault();
    const erros = validarCadastro();
    if (Object.keys(erros).length > 0) {
      setCadastroErros(erros);
      return;
    }
    console.log("Cadastro enviado:", cadastroForm); // TODO: chamar API
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-start lg:items-center py-10 px-6 sm:px-10 font-barlow bg-branco sm:bg-gray-50 lg:bg-gray-50">
      <div className="w-full max-w-4xl sm:min-h-190 lg:min-h-120 sm:bg-branco sm:rounded-[40px] sm:border sm:border-preto/40 sm:shadow-lg sm:p-10 lg:p-10 flex flex-col lg:flex-row gap-10 sm:gap-6 lg:gap-0">
        {/* LADO ESQUERDO: LOGIN SOCIAL */}
        <div className="w-full lg:w-1/2 flex flex-col lg:pr-10 lg:border-r lg:border-black/80 lg:justify-start">
          <div className="text-center mb-6 sm:mb-10 lg:mb-6">
            <h2 className="text-xl sm:text-[26px] lg:text-2xl font-extrabold uppercase text-black tracking-wide mb-3 sm:mb-6 lg:mb-4">
              <span className="hidden lg:block">Entrar com uma conta</span>
              <span className="lg:hidden">Acesso Fácil</span>
            </h2>
            <p className="text-black font-medium text-[14px] sm:text-base lg:text-sm">
              Conecte-se usando uma conta de outra plataforma
            </p>
          </div>

          <div className="flex flex-row lg:flex-col justify-center gap-6 sm:gap-6 lg:gap-4 w-full mx-auto lg:max-w-none lg:mx-0">
            <BotaoSocial provider="google" label="Login com Google" />
            <BotaoSocial provider="facebook" label="Login com Facebook" />
            <BotaoSocial provider="apple" label="Login com Apple" />
          </div>

          <div className="flex lg:hidden items-center mt-8 sm:mt-10 sm:mb-2 w-full sm:max-w-102 mx-auto">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm sm:text-base">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>

        {/* LADO DIREITO: FORMULÁRIOS */}
        <div className="w-full lg:w-1/2 lg:pl-10 flex flex-col justify-start sm:max-w-md sm:mx-auto lg:max-w-none lg:mx-0">
          <h2 className="text-xl sm:text-[26px] lg:text-2xl font-extrabold uppercase text-black tracking-wide mb-6 text-center lg:text-left">
            {isLogin ? (
              <>
                <span className="hidden lg:block">Entre ou Cadastre-se</span>
                <span className="lg:hidden">Tenho Cadastro</span>
              </>
            ) : (
              <>
                <span className="hidden lg:block">Entre ou Cadastre-se</span>
                <span className="lg:hidden">Quero me Cadastrar</span>
              </>
            )}
          </h2>

          {isLogin ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleLoginSubmit}
              noValidate
            >
              <InputCampo
                label="E-mail"
                required
                type="email"
                value={loginForm.email}
                onChange={(e) => handleLoginChange("email", e.target.value)}
                error={loginErros.email}
              />
              <div className="flex flex-col">
                <InputSenha
                  label="Senha"
                  required
                  value={loginForm.senha}
                  onChange={(e) => handleLoginChange("senha", e.target.value)}
                  error={loginErros.senha}
                />
                <div className="text-left mt-1">
                  <a
                    href="#"
                    className="text-[12px] text-black/80 underline hover:text-black hover:font-bold transition-colors"
                  >
                    Esqueci minha senha
                  </a>
                </div>
              </div>
              <BotaoBordaDupla variant="Army" type="submit">
                Entrar <MoveRight size={22} />
              </BotaoBordaDupla>
              <BotaoBordaDupla
                variant="light"
                onClick={() => {
                  setIsLogin(false);
                  setLoginErros({});
                }}
              >
                Cadastre-se <MoveRight size={22} />
              </BotaoBordaDupla>
            </form>
          ) : (
            <form
              className="flex flex-col gap-4 animate-in fade-in duration-300"
              onSubmit={handleCadastroSubmit}
              noValidate
            >
              <InputCampo
                label="Nome e Sobrenome"
                required
                value={cadastroForm.nome}
                onChange={(e) => handleCadastroChange("nome", e.target.value)}
                error={cadastroErros.nome}
              />
              <InputCampo
                label="CPF"
                required
                value={cadastroForm.cpf}
                onChange={(e) => handleCadastroChange("cpf", e.target.value)}
                error={cadastroErros.cpf}
                inputMode="numeric"
              />
              <InputCampo
                label="Celular"
                required
                value={cadastroForm.celular}
                onChange={(e) =>
                  handleCadastroChange("celular", e.target.value)
                }
                error={cadastroErros.celular}
                inputMode="numeric"
              />
              <InputCampo
                label="E-mail pessoal"
                required
                type="email"
                value={cadastroForm.email}
                onChange={(e) => handleCadastroChange("email", e.target.value)}
                error={cadastroErros.email}
              />
              <InputCampo
                label="Data de Nascimento"
                required
                value={cadastroForm.nascimento}
                onChange={(e) =>
                  handleCadastroChange("nascimento", e.target.value)
                }
                error={cadastroErros.nascimento}
                inputMode="numeric"
              />

              <InputSenha
                label="Senha"
                required
                value={cadastroForm.senha}
                onChange={(e) => handleCadastroChange("senha", e.target.value)}
                error={cadastroErros.senha}
              />

              <div className="text-[10px] text-gray-600 -mt-2 mb-1">
                <p className="font-bold mb-1 text-black">
                  Sua senha precisa ter:
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1">
                    Mínimo 8 caracteres <Info className="text-gold" size={11} />
                  </span>
                  <span className="flex items-center gap-1">
                    1 caractere especial{" "}
                    <Info className="text-gold" size={11} />
                  </span>
                  <span className="flex items-center gap-1">
                    1 letra maiúscula <Info className="text-gold" size={11} />
                  </span>
                </div>
              </div>

              <InputSenha
                label="Confirmação de Senha"
                required
                value={cadastroForm.confirmaSenha}
                onChange={(e) =>
                  handleCadastroChange("confirmaSenha", e.target.value)
                }
                error={cadastroErros.confirmaSenha}
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="mt-0.5 border-gray-300 h-4 w-4 shrink-0 accent-army cursor-pointer"
                    checked={cadastroForm.termos}
                    onChange={(e) =>
                      handleCadastroChange("termos", e.target.checked)
                    }
                  />
                  <label className="text-[10px] leading-tight text-gray-600">
                    Ao clicar em cadastre-se, você concorda com os{" "}
                    <a href="#" className="underline">
                      Termos e Condições Coturnos & Cia
                    </a>
                    ,{" "}
                    <a href="#" className="underline">
                      Termos e Condições de Navegação
                    </a>{" "}
                    e{" "}
                    <a href="#" className="underline">
                      Política de Privacidade
                    </a>
                    .*
                  </label>
                </div>
                {cadastroErros.termos && (
                  <span className="text-red-500 text-[11px] ml-6">
                    {cadastroErros.termos}
                  </span>
                )}
              </div>

              <BotaoBordaDupla variant="Army" type="submit">
                Cadastre-se <MoveRight size={20} />
              </BotaoBordaDupla>

              <div className="text-center mt-2">
                <span className="hidden md:inline text-[12px] text-gray-600">
                  Já tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setCadastroErros({});
                    }}
                    className="underline font-bold text-black hover:text-gray-700 cursor-pointer"
                  >
                    Clique aqui para entrar
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setCadastroErros({});
                  }}
                  className="md:hidden text-[13px] underline text-black font-bold float-left mt-2 hover:text-gray-700 cursor-pointer"
                >
                  Voltar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
