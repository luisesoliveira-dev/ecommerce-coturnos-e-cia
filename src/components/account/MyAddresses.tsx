import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/useAuth";
import { MapPin, Plus, Trash2, Star, Check } from "lucide-react";
import type { UserAddress } from "../../context/AuthContextObject";

function AddressCard({
  address,
  onSetPrimary,
  onDelete,
}: {
  address: UserAddress;
  onSetPrimary: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`border rounded-xl p-5 space-y-3 relative transition-all bg-white flex flex-col justify-between ${
        address.isPrimary
          ? "border-army bg-army/2 shadow-sm ring-1 ring-army/20"
          : "border-zinc-200 hover:border-zinc-300 shadow-xs"
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                address.isPrimary
                  ? "bg-army/10 text-army"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              <MapPin size={15} />
            </div>
            <p className="font-bold uppercase text-sm text-zinc-900 tracking-wide">
              {address.label}
            </p>
          </div>

          {address.isPrimary && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-army bg-army/10 border border-army/20 px-2.5 py-0.5 rounded-full">
              <Star size={10} fill="currentColor" className="text-gold" />{" "}
              Principal
            </span>
          )}
        </div>

        <div className="text-xs text-zinc-600 leading-relaxed font-sans pl-9">
          <p className="font-semibold text-zinc-900">
            {address.street}, {address.number}
            {address.complement && ` · ${address.complement}`}
          </p>
          <p>
            {address.neighborhood} — {address.city}/{address.state}
          </p>
          <p className="text-zinc-400 font-mono mt-0.5">CEP: {address.zip}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 pl-9">
        {!address.isPrimary ? (
          <button
            type="button"
            onClick={onSetPrimary}
            className="text-[11px] font-bold uppercase tracking-wider text-army hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Check size={12} /> Definir como principal
          </button>
        ) : (
          <span className="text-[11px] text-zinc-400 font-medium">
            Endereço padrão de entrega
          </span>
        )}

        <button
          type="button"
          onClick={onDelete}
          className="text-[11px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-red-50"
          title="Remover endereço"
        >
          <Trash2 size={12} /> Remover
        </button>
      </div>
    </div>
  );
}

export function MyAddresses() {
  const { user, updateUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  const [newAddr, setNewAddr] = useState<Omit<UserAddress, "id" | "isPrimary">>(
    {
      label: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip: "",
    },
  );

  if (!user) return null;

  const setField = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewAddr((prev) => ({ ...prev, [field]: val }));

    if (field === "zip") {
      const clean = val.replace(/\D/g, "");
      if (clean.length === 8) {
        handleSearchCep(clean);
      }
    }
  };

  const handleSearchCep = async (cleanCep: string) => {
    setSearchingCep(true);
    setCepError("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setNewAddr((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {
      setCepError("Erro ao consultar CEP.");
    } finally {
      setSearchingCep(false);
    }
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.number || !newAddr.city) return;

    const updated: UserAddress[] = [
      ...user.addresses,
      {
        ...newAddr,
        id: `addr-${Date.now()}`,
        isPrimary: user.addresses.length === 0,
      },
    ];
    updateUser({ addresses: updated });
    setShowForm(false);
    setNewAddr({
      label: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const handleSetPrimary = (id: string) => {
    updateUser({
      addresses: user.addresses.map((a) => ({ ...a, isPrimary: a.id === id })),
    });
  };

  const handleDelete = (id: string) => {
    if (user.addresses.length <= 1) {
      if (!confirm("Este é o seu único endereço. Deseja realmente remover?"))
        return;
    }
    updateUser({ addresses: user.addresses.filter((a) => a.id !== id) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <h2 className="font-bold text-2xl uppercase text-zinc-900 tracking-wide">
            Endereços de Entrega
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">
            {user.addresses.length} local(is) cadastrado(s) para recebimento de
            pedidos
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-army text-white font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-army/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Plus size={14} /> Novo Endereço
        </button>
      </div>

      {/* Formulário de Novo Endereço */}
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleAdd}
              className="border border-zinc-300 rounded-xl p-6 space-y-4 bg-zinc-50 mb-4 shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                  Cadastrar Novo Endereço
                </span>
                <span className="text-[11px] text-zinc-500">
                  Preencha o CEP para autocompletar o logradouro
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* CEP */}
                <div className="sm:col-span-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    CEP * {searchingCep && "(buscando...)"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="00000-000"
                    value={newAddr.zip}
                    onChange={setField("zip")}
                    className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
                  />
                  {cepError && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {cepError}
                    </span>
                  )}
                </div>

                {/* Apelido do Endereço */}
                <div className="sm:col-span-8">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Apelido do Endereço (ex: Casa, Trabalho, Batalhão) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Minha Casa"
                    value={newAddr.label}
                    onChange={setField("label")}
                    className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
                  />
                </div>

                {/* Logradouro */}
                <div className="sm:col-span-8">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Logradouro (Rua, Av., Praça) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Avenida Brasil"
                    value={newAddr.street}
                    onChange={setField("street")}
                    className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
                  />
                </div>

                {/* Número */}
                <div className="sm:col-span-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Número *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={newAddr.number}
                    onChange={setField("number")}
                    className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
                  />
                </div>

                {/* Complemento */}
                <div className="sm:col-span-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    placeholder="Apto, Bloco, Sala"
                    value={newAddr.complement}
                    onChange={setField("complement")}
                    className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
                  />
                </div>

                {/* Bairro */}
                <div className="sm:col-span-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bairro"
                    value={newAddr.neighborhood}
                    onChange={setField("neighborhood")}
                    className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow w-full bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army"
                  />
                </div>

                {/* Cidade / UF */}
                <div className="sm:col-span-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Cidade / UF *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Cidade"
                      value={newAddr.city}
                      onChange={setField("city")}
                      className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 font-barlow flex-1 bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army min-w-0"
                    />
                    <input
                      type="text"
                      required
                      placeholder="UF"
                      maxLength={2}
                      value={newAddr.state}
                      onChange={setField("state")}
                      className="border border-zinc-300 rounded-lg px-2.5 py-2.5 text-sm text-zinc-900 font-barlow w-14 text-center uppercase bg-white focus:outline-none focus:border-army focus:ring-1 focus:ring-army shrink-0"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-200">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-army text-white font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-army/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-army transition-colors cursor-pointer shadow-xs"
                >
                  Confirmar Endereço
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 border border-zinc-300 text-zinc-700 font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer bg-white"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Endereços Cadastrados (1 col mobile, 2 cols desktop) */}
      {user.addresses.length === 0 && !showForm ? (
        <div className="border border-dashed border-zinc-300 rounded-xl p-10 text-center space-y-3 bg-zinc-50/50">
          <MapPin size={32} className="text-zinc-400 mx-auto" />
          <p className="font-bold uppercase text-sm text-zinc-600">
            Nenhum endereço cadastrado
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-xs font-bold uppercase tracking-widest text-army hover:text-gold transition-colors"
          >
            + Cadastrar primeiro endereço
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onSetPrimary={() => handleSetPrimary(addr.id)}
              onDelete={() => handleDelete(addr.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
