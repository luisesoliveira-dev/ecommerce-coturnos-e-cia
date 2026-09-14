import {
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { useAuth } from "../../context/useAuth";
import {
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Camera,
  Trash2,
  KeyRound,
  AlertCircle,
} from "lucide-react";

interface FieldProps {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  icon?: ReactNode;
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  readOnly = false,
  helperText,
  icon,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center justify-between">
        <span>{label}</span>
        {readOnly && (
          <span className="inline-flex items-center gap-1 text-[10px] font-normal lowercase tracking-normal text-zinc-400">
            <Lock size={11} /> somente leitura
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full rounded-lg px-3.5 py-2.5 text-sm font-barlow transition-colors ${
            readOnly
              ? "bg-zinc-100 text-zinc-500 border border-zinc-200 cursor-not-allowed select-none"
              : "bg-white text-zinc-900 border border-zinc-300 focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
          } ${icon ? "pr-10" : ""}`}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-[11px] text-zinc-400 leading-normal">{helperText}</p>
      )}
    </div>
  );
}

export function PersonalData() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [savedMessage, setSavedMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    user?.avatar,
  );

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    cpf: user?.cpf ?? "",
    phone: user?.phone ?? "",
    birthdate: user?.birthdate ?? "",
  });

  // Password Modal/Flow states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  if (!user) return null;

  const set = (field: string) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  // Handle Photo Upload
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to ~2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem selecionada deve ter no máximo 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setAvatarPreview(dataUrl);
      updateUser({ avatar: dataUrl });
      setSavedMessage("Foto de perfil atualizada com sucesso!");
      setTimeout(() => setSavedMessage(""), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(undefined);
    updateUser({ avatar: undefined });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSavedMessage("Foto de perfil removida.");
    setTimeout(() => setSavedMessage(""), 3500);
  };

  // Handle Main Form Save
  const handleSaveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({
      name: form.name,
      phone: form.phone,
      birthdate: form.birthdate,
      cpf: form.cpf,
      avatar: avatarPreview,
    });
    setSavedMessage("Dados cadastrais atualizados com sucesso!");
    setTimeout(() => setSavedMessage(""), 3500);
  };

  // Handle Password Change
  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Informe sua senha atual.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("A confirmação de senha não confere.");
      return;
    }

    // Simulated password update success
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSavedMessage("Senha alterada com sucesso!");
      setTimeout(() => setSavedMessage(""), 3500);
    }, 1200);
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-4">
        <h2 className="font-bold text-2xl uppercase text-zinc-900 tracking-wide">
          Dados Pessoais
        </h2>
        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
          Gerencie suas informações cadastrais e segurança da conta
        </p>
      </div>

      {/* Global Success Notification */}
      {savedMessage && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider animate-in fade-in duration-200 shadow-xs">
          <CheckCircle size={17} className="text-emerald-600 shrink-0" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Seção 1: Foto de Perfil */}
      <div className="p-6 bg-zinc-50/70 rounded-xl border border-zinc-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-zinc-300 bg-white flex items-center justify-center shadow-xs">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-army text-white flex items-center justify-center text-3xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-zinc-900 text-white hover:bg-army transition-colors shadow-md cursor-pointer"
            title="Alterar foto"
          >
            <Camera size={15} />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Foto de Perfil
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
            Personalize seu perfil com uma foto. Formatos suportados: JPG, PNG
            ou WebP (tamanho máx. 2MB).
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white border border-zinc-300 hover:border-army hover:text-army text-zinc-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Escolher Foto
            </button>
            {avatarPreview && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-3 py-2 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={13} /> Remover
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Seção 2: Formulário de Informações Pessoais (2 Colunas Desktop) */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
            Informações do Cadastro
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <InputField
                label="Nome Completo *"
                value={form.name}
                onChange={set("name")}
                placeholder="Seu nome completo"
              />
            </div>

            {/* E-mail Bloqueado (Read-Only) */}
            <InputField
              label="E-mail de Cadastro"
              value={form.email}
              readOnly
              helperText="O e-mail é a chave de acesso da sua conta e não pode ser alterado diretamente."
              icon={<Lock size={15} className="text-zinc-400" />}
            />

            <InputField
              label="CPF"
              value={form.cpf}
              onChange={set("cpf")}
              placeholder="000.000.000-00"
            />

            <InputField
              label="Telefone / WhatsApp *"
              value={form.phone}
              onChange={set("phone")}
              placeholder="(11) 99999-9999"
            />

            <InputField
              label="Data de Nascimento"
              value={form.birthdate}
              onChange={set("birthdate")}
              placeholder="DD/MM/AAAA"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-army text-white font-bold uppercase tracking-wider rounded-lg text-xs hover:bg-army/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army transition-all cursor-pointer shadow-xs w-full sm:w-auto"
          >
            <Save size={15} />
            Salvar Informações
          </button>
        </div>
      </form>

      {/* Seção 3: Fluxo Dedicado de Alteração de Senha */}
      <div className="border-t border-zinc-200 pt-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
                Segurança de Acesso
              </h3>
              <p className="text-xs text-zinc-500">
                Mantenha sua conta protegida atualizando sua senha
                periodicamente.
              </p>
            </div>
          </div>

          {!isChangingPassword && (
            <button
              type="button"
              onClick={() => setIsChangingPassword(true)}
              className="px-4 py-2.5 bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <KeyRound size={14} className="text-zinc-500" />
              Alterar Senha
            </button>
          )}
        </div>

        {/* Formulário de Alteração de Senha (Expandido quando solicitado) */}
        {isChangingPassword && (
          <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-300/80 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 flex items-center gap-1.5">
                <KeyRound size={14} className="text-army" /> Atualização de
                Senha
              </span>
              <span className="text-[11px] text-zinc-400">
                Mínimo 6 caracteres
              </span>
            </div>

            {passwordError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                <AlertCircle size={15} className="shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                <CheckCircle size={15} className="shrink-0" />
                <span>Validando e alterando senha...</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Senha Atual */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Senha Atual *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite sua senha atual"
                    className="w-full rounded-lg px-3.5 py-2.5 text-sm font-barlow bg-white text-zinc-900 border border-zinc-300 focus:outline-none focus:border-army focus:ring-1 focus:ring-army pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Nova Senha & Confirmação (Grid 2 colunas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Nova Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm font-barlow bg-white text-zinc-900 border border-zinc-300 focus:outline-none focus:border-army focus:ring-1 focus:ring-army pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Confirmar Nova Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a nova senha"
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm font-barlow bg-white text-zinc-900 border border-zinc-300 focus:outline-none focus:border-army focus:ring-1 focus:ring-army pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showConfirmPass ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={passwordSuccess}
                  className="px-5 py-2.5 bg-army text-white font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-army/90 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                >
                  Confirmar Nova Senha
                </button>
                <button
                  type="button"
                  onClick={cancelPasswordChange}
                  className="px-4 py-2.5 border border-zinc-300 text-zinc-700 font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer bg-white"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
