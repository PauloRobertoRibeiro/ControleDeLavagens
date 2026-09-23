const KEY = "controle-lavagens-v1";
const SIZES = [
  { id: "citadino", label: "Citadino" },
  { id: "berlina", label: "Berlina" },
  { id: "suv", label: "SUV" },
  { id: "van", label: "Van" },
  { id: "moto", label: "Moto" },
];
const STATUS = {
  pedido: { label: "Pedido", chip: "wait" },
  confirmado: { label: "Confirmado", chip: "busy" },
  curso: { label: "Em curso", chip: "busy" },
  feito: { label: "Concluído", chip: "done" },
  cancelado: { label: "Cancelado", chip: "stop" },
  falta: { label: "Não veio", chip: "stop" },
};
const PAY = ["Numerário", "Transferência", "Cartão", "MB Way", "Bizum", "Pendente"];

const $ = (id) => document.getElementById(id);
const view = $("view");
const modal = $("modal");

let db = load();
let monthCursor = startOfMonth(new Date());
let selectedDay = isoDate(new Date());
let clientQuery = "";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function isoDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function parseISO(value) {
  const [y, m, d] = String(value).split("-").map(Number);
  return new Date(y, m - 1, d);
}

function fmtDate(value) {
  if (!value) return "—";
  const d = parseISO(value);
  return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtMoney(n) {
  const cur = db.settings.currency || "EUR";
  return Number(n || 0).toLocaleString("pt-PT", { style: "currency", currency: cur });
}

function daysBetween(a, b) {
  return Math.round((parseISO(b) - parseISO(a)) / 86400000);
}

function today() {
  return isoDate(new Date());
}

function defaultServices() {
  const row = (name, category, durationMin, prices) => ({
    id: uid(),
    name,
    category,
    durationMin,
    active: true,
    prices,
  });
  return [
    row("Lavagem exterior", "base", 30, { citadino: 12, berlina: 15, suv: 20, van: 25, moto: 8 }),
    row("Lavagem interior", "base", 40, { citadino: 15, berlina: 18, suv: 25, van: 30, moto: 0 }),
    row("Lavagem completa", "base", 60, { citadino: 22, berlina: 28, suv: 38, van: 45, moto: 12 }),
    row("Motor", "extra", 25, { citadino: 20, berlina: 22, suv: 25, van: 28, moto: 15 }),
    row("Cera / proteção", "extra", 20, { citadino: 15, berlina: 18, suv: 25, van: 30, moto: 10 }),
    row("Jantes", "extra", 15, { citadino: 10, berlina: 12, suv: 15, van: 18, moto: 8 }),
    row("Estofos", "premium", 90, { citadino: 40, berlina: 50, suv: 70, van: 80, moto: 0 }),
    row("Polimento", "premium", 180, { citadino: 80, berlina: 100, suv: 140, van: 160, moto: 40 }),
    row("Ozono / desinfeção", "extra", 30, { citadino: 25, berlina: 25, suv: 30, van: 35, moto: 15 }),
    row("Detailing premium", "premium", 240, { citadino: 120, berlina: 150, suv: 200, van: 240, moto: 60 }),
  ];
}

function emptyDb() {
  return {
    version: 1,
    settings: {
      businessName: "Controle de Lavagens",
      owner: "",
      phone: "",
      whatsapp: "",
      address: "",
      city: "",
      prefix: "34",
      currency: "EUR",
      openHour: "09:00",
      closeHour: "19:00",
      slotMin: 30,
      workDays: [1, 2, 3, 4, 5, 6],
      reminderDays: 30,
      seeded: false,
      welcome: true,
    },
    staff: [{ id: "s1", name: "Lavador 1", active: true }],
    services: defaultServices(),
    clients: [],
    vehicles: [],
    jobs: [],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyDb();
    const data = JSON.parse(raw);
    const base = emptyDb();
    return {
      ...base,
      ...data,
      settings: { ...base.settings, ...(data.settings || {}) },
      staff: data.staff?.length ? data.staff : base.staff,
      services: data.services?.length ? data.services : base.services,
      clients: data.clients || [],
      vehicles: data.vehicles || [],
      jobs: data.jobs || [],
    };
  } catch {
    return emptyDb();
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function clientById(id) {
  return db.clients.find((c) => c.id === id);
}
function vehicleById(id) {
  return db.vehicles.find((v) => v.id === id);
}
function staffById(id) {
  return db.staff.find((s) => s.id === id);
}
function serviceById(id) {
  return db.services.find((s) => s.id === id);
}

function vehiclesOf(clientId) {
  return db.vehicles.filter((v) => v.clientId === clientId);
}

function jobsOfVehicle(vehicleId) {
  return db.jobs
    .filter((j) => j.vehicleId === vehicleId && j.status === "feito")
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function lastWash(vehicleId) {
  return jobsOfVehicle(vehicleId)[0] || null;
}

function sizeLabel(id) {
  return SIZES.find((s) => s.id === id)?.label || id || "—";
}

function priceOf(service, size) {
  return Number(service?.prices?.[size] || 0);
}

function jobTotal(job) {
  if (job.total != null && job.total !== "") return Number(job.total);
  const vehicle = vehicleById(job.vehicleId);
  const size = vehicle?.size || "berlina";
  const sum = (job.serviceIds || []).reduce((acc, id) => acc + priceOf(serviceById(id), size), 0);
  return Math.max(0, sum - Number(job.discount || 0));
}

function jobsOn(date) {
  return db.jobs
    .filter((j) => j.date === date && j.status !== "cancelado")
    .sort((a, b) => String(a.start).localeCompare(String(b.start)));
}

function conflict(job) {
  return db.jobs.some((other) => {
    if (other.id === job.id || other.date !== job.date) return false;
    if (other.status === "cancelado") return false;
    if (other.staffId && job.staffId && other.staffId !== job.staffId) return false;
    return other.start < job.end && job.start < other.end;
  });
}

function dueVehicles() {
  const days = Number(db.settings.reminderDays || 30);
  const now = today();
  return db.vehicles
    .map((vehicle) => {
      const last = lastWash(vehicle.id);
      const lastDate = last?.date || vehicle.lastServiceAt || "";
      const elapsed = lastDate ? daysBetween(lastDate, now) : 999;
      const next = lastDate
        ? isoDate(new Date(parseISO(lastDate).getTime() + days * 86400000))
        : "";
      return { vehicle, last, lastDate, elapsed, next, overdue: elapsed >= days };
    })
    .sort((a, b) => b.elapsed - a.elapsed);
}

function digitsPhone(phone) {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  const prefix = db.settings.prefix || "34";
  if (d.length === 9) d = prefix + d;
  return d;
}

function waLink(phone, text) {
  const d = digitsPhone(phone);
  if (!d) return "";
  return `https://wa.me/${d}?text=${encodeURIComponent(text)}`;
}

function vehicleTitle(vehicle) {
  if (!vehicle) return "Veículo";
  return [vehicle.brand, vehicle.model, vehicle.plate].filter(Boolean).join(" ") || "Veículo";
}

function hashParts() {
  const raw = (location.hash || "#hoje").slice(1);
  const [page, id] = raw.split("/");
  return { page: page || "hoje", id: id || "" };
}

function go(hash) {
  location.hash = hash;
}

function seedExample() {
  const c1 = { id: uid(), name: "Maria Silva", phone: "612345678", notes: "", createdAt: today() };
  const c2 = { id: uid(), name: "João Pereira", phone: "698765432", notes: "", createdAt: today() };
  const c3 = { id: uid(), name: "Ana Costa", phone: "655000111", notes: "", createdAt: today() };
  const v1 = { id: uid(), clientId: c1.id, plate: "1234 ABC", brand: "VW", model: "Golf", color: "Branco", size: "berlina" };
  const v2 = { id: uid(), clientId: c2.id, plate: "9876 XYZ", brand: "BMW", model: "X3", color: "Preto", size: "suv" };
  const v3 = { id: uid(), clientId: c3.id, plate: "5555 LMN", brand: "Seat", model: "Ibiza", color: "Azul", size: "citadino" };
  const full = db.services.find((s) => s.name.includes("completa"));
  const ext = db.services.find((s) => s.name.includes("exterior"));
  const old = isoDate(new Date(Date.now() - 42 * 86400000));
  db.clients.push(c1, c2, c3);
  db.vehicles.push(v1, v2, v3);
  db.jobs.push(
    {
      id: uid(),
      clientId: c1.id,
      vehicleId: v1.id,
      staffId: db.staff[0].id,
      date: old,
      start: "10:00",
      end: "11:00",
      serviceIds: [full.id],
      status: "feito",
      discount: 0,
      paid: true,
      payMethod: "Numerário",
      notes: "",
    },
    {
      id: uid(),
      clientId: c3.id,
      vehicleId: v3.id,
      staffId: db.staff[0].id,
      date: today(),
      start: "11:00",
      end: "12:00",
      serviceIds: [ext.id],
      status: "confirmado",
      discount: 0,
      paid: false,
      payMethod: "Pendente",
      notes: "",
    },
    {
      id: uid(),
      clientId: c2.id,
      vehicleId: v2.id,
      staffId: db.staff[0].id,
      date: isoDate(new Date(Date.now() + 86400000)),
      start: "16:00",
      end: "17:30",
      serviceIds: [full.id],
      status: "pedido",
      discount: 0,
      paid: false,
      payMethod: "Pendente",
      notes: "SUV com pêlo de cão",
    }
  );
  db.settings.seeded = true;
  db.settings.welcome = false;
  save();
}

function startEmpty() {
  db.settings.welcome = false;
  save();
  render();
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function chipStatus(status) {
  const meta = STATUS[status] || STATUS.pedido;
  return `<span class="chip ${meta.chip}">${meta.label}</span>`;
}

function pageWelcome() {
  $("pageTitle").textContent = "Começar";
  return `
    <div class="card">
      <h2>Controle de Lavagens</h2>
      <p>Agenda da lavação: clientes, veículos, preços, marcações e lembrete da última limpeza. Tudo fica neste telemóvel, sem Play Store.</p>
      <div class="actions">
        <button class="btn wide" data-act="start-empty">Começar com a minha oficina</button>
        <button class="btn ghost wide" data-act="seed">Ver um dia de exemplo</button>
      </div>
    </div>`;
}

function pageHoje() {
  const list = jobsOn(today());
  const due = dueVehicles().filter((x) => x.overdue && x.lastDate).length;
  const pending = db.jobs.filter((j) => j.status === "feito" && !j.paid).length;
  const money = db.jobs
    .filter((j) => j.date === today() && j.paid && j.status === "feito")
    .reduce((a, j) => a + jobTotal(j), 0);
  return `
    <div class="grid">
      <div class="stat"><b>${list.length}</b><span>lavagens hoje</span></div>
      <div class="stat"><b>${fmtMoney(money)}</b><span>recebido hoje</span></div>
      <div class="stat"><b>${due}</b><span>para lembrar</span></div>
      <div class="stat"><b>${pending}</b><span>por cobrar</span></div>
    </div>
    <div class="card">
      <div class="row"><h2>Fila de hoje</h2><button class="btn ghost" data-act="nova" data-date="${today()}">Marcar</button></div>
      ${list.length ? list.map(jobItem).join("") : `<p class="empty">Nada marcado para hoje.</p>`}
    </div>`;
}

function jobItem(job) {
  const client = clientById(job.clientId);
  const vehicle = vehicleById(job.vehicleId);
  return `
    <button class="item" data-act="open-job" data-id="${job.id}">
      <div class="grow">
        <strong>${esc(job.start)} · ${esc(client?.name || "Cliente")}</strong>
        <small>${esc(vehicleTitle(vehicle))} · ${fmtMoney(jobTotal(job))}</small>
      </div>
      ${chipStatus(job.status)}
    </button>`;
}

function pageAgenda() {
  const y = monthCursor.getFullYear();
  const m = monthCursor.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  const marked = new Set(db.jobs.filter((j) => j.status !== "cancelado").map((j) => j.date));
  const list = jobsOn(selectedDay);
  const monthName = monthCursor.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
  return `
    <div class="card">
      <div class="row">
        <button class="btn ghost" data-act="month" data-dir="-1">‹</button>
        <strong style="text-transform:capitalize">${esc(monthName)}</strong>
        <button class="btn ghost" data-act="month" data-dir="1">›</button>
      </div>
      <div class="cal" style="margin-top:10px">
        ${["D", "S", "T", "Q", "Q", "S", "S"].map((d) => `<div class="dow">${d}</div>`).join("")}
        ${days
          .map((d) => {
            const iso = isoDate(d);
            const out = d.getMonth() !== m ? "out" : "";
            const on = iso === selectedDay ? "on" : "";
            const mark = marked.has(iso) ? "mark" : "";
            return `<button class="${out} ${on} ${mark}" data-act="day" data-date="${iso}">${d.getDate()}</button>`;
          })
          .join("")}
      </div>
    </div>
    <div class="card">
      <div class="row">
        <h2>${fmtDate(selectedDay)}</h2>
        <button class="btn" data-act="nova" data-date="${selectedDay}">Marcar</button>
      </div>
      ${list.length ? list.map(jobItem).join("") : `<p class="empty">Livre neste dia.</p>`}
    </div>`;
}

function pageClientes() {
  const q = clientQuery.trim().toLowerCase();
  const rows = db.clients
    .filter((c) => {
      if (!q) return true;
      const plates = vehiclesOf(c.id).map((v) => `${v.plate} ${v.brand} ${v.model}`).join(" ");
      return `${c.name} ${c.phone} ${plates}`.toLowerCase().includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt"));
  return `
    <input class="search" id="qClient" placeholder="Nome, telefone ou matrícula" value="${esc(clientQuery)}" />
    <div class="actions"><button class="btn wide" data-act="new-client">Novo cliente</button></div>
    <div class="list" style="margin-top:10px">
      ${
        rows.length
          ? rows
              .map((c) => {
                const vs = vehiclesOf(c.id);
                return `<button class="item" data-act="open-client" data-id="${c.id}">
                  <div class="grow"><strong>${esc(c.name)}</strong><small>${esc(c.phone || "sem telefone")} · ${vs.length} veículo(s)</small></div>
                </button>`;
              })
              .join("")
          : `<p class="empty">Ainda não há clientes.</p>`
      }
    </div>`;
}

function pageCliente(id) {
  const client = clientById(id);
  if (!client) return `<p class="empty">Cliente não encontrado.</p>`;
  const vs = vehiclesOf(id);
  const hist = db.jobs
    .filter((j) => j.clientId === id)
    .sort((a, b) => `${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`))
    .slice(0, 12);
  return `
    <div class="card">
      <h2>${esc(client.name)}</h2>
      <p class="muted">${esc(client.phone || "Sem telefone")}${client.email ? " · " + esc(client.email) : ""}</p>
      <div class="actions">
        <button class="btn" data-act="nova" data-client="${client.id}">Marcar lavagem</button>
        ${
          client.phone
            ? `<a class="btn gold" target="_blank" rel="noopener" href="${waLink(
                client.phone,
                `Olá ${client.name}, aqui é ${db.settings.businessName}.`
              )}">WhatsApp</a>`
            : ""
        }
        <button class="btn ghost" data-act="edit-client" data-id="${client.id}">Editar</button>
      </div>
    </div>
    <div class="card">
      <div class="row"><h2>Veículos</h2><button class="btn ghost" data-act="new-vehicle" data-client="${client.id}">+ veículo</button></div>
      ${
        vs.length
          ? vs
              .map((v) => {
                const last = lastWash(v.id);
                return `<button class="item" data-act="edit-vehicle" data-id="${v.id}">
                  <div class="grow">
                    <strong>${esc(vehicleTitle(v))}</strong>
                    <small>${sizeLabel(v.size)} · última: ${last ? fmtDate(last.date) : "nunca"}</small>
                  </div>
                </button>`;
              })
              .join("")
          : `<p class="empty">Sem veículos. Adicione a matrícula.</p>`
      }
    </div>
    <div class="card">
      <h2>Histórico</h2>
      ${hist.length ? hist.map(jobItem).join("") : `<p class="empty">Ainda sem lavagens.</p>`}
    </div>`;
}

function pageLembretes() {
  const days = Number(db.settings.reminderDays || 30);
  const rows = dueVehicles();
  const overdue = rows.filter((x) => x.overdue);
  const soon = rows.filter((x) => !x.overdue && x.lastDate && x.elapsed >= days - 7);
  const block = (title, items) => `
    <div class="card">
      <h2>${title}</h2>
      ${
        items.length
          ? items
              .map(({ vehicle, lastDate, elapsed, next }) => {
                const client = clientById(vehicle.clientId);
                const msg = `Olá ${client?.name || ""}, a última lavagem do ${vehicleTitle(
                  vehicle
                )} foi há ${elapsed === 999 ? "muito tempo" : elapsed + " dias"} (${
                  lastDate ? fmtDate(lastDate) : "sem registo"
                }). Quer marcar a próxima? ${db.settings.businessName}`;
                const href = client?.phone ? waLink(client.phone, msg) : "";
                return `<div class="item">
                  <div class="grow">
                    <strong>${esc(client?.name || "Cliente")} · ${esc(vehicleTitle(vehicle))}</strong>
                    <small>${
                      lastDate ? `última ${fmtDate(lastDate)} · ${elapsed} dias` : "nunca lavou aqui"
                    }${next ? ` · sugerido ${fmtDate(next)}` : ""}</small>
                  </div>
                  <div class="actions" style="margin:0">
                    ${href ? `<a class="btn gold" target="_blank" rel="noopener" href="${href}">WhatsApp</a>` : ""}
                    <button class="btn" data-act="nova" data-client="${vehicle.clientId}" data-vehicle="${vehicle.id}">Marcar</button>
                  </div>
                </div>`;
              })
              .join("")
          : `<p class="empty">Nada nesta lista.</p>`
      }
    </div>`;
  return `
    <p class="muted">Aviso quando passam ${days} dias da última lavagem (ajuste em Mais → Oficina).</p>
    ${block("Já passou o prazo", overdue)}
    ${block("Esta semana", soon)}`;
}

function pagePreços() {
  const sizes = SIZES;
  return `
    <div class="card">
      <div class="row"><h2>Tabela de preços</h2><button class="btn ghost" data-act="new-service">+ serviço</button></div>
      <div style="overflow:auto">
        <table class="price-table">
          <thead>
            <tr>
              <th>Serviço</th>
              ${sizes.map((s) => `<th>${s.label}</th>`).join("")}
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${db.services
              .map(
                (svc) => `<tr>
                <td><input data-price-name="${svc.id}" value="${esc(svc.name)}" /></td>
                ${sizes
                  .map(
                    (s) =>
                      `<td><input type="number" min="0" step="0.5" data-price="${svc.id}" data-size="${s.id}" value="${
                        svc.prices[s.id] ?? 0
                      }" /></td>`
                  )
                  .join("")}
                <td><button class="btn ghost" data-act="del-service" data-id="${svc.id}">×</button></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="muted">O total da marcação usa o tipo do veículo (citadino, SUV, van…).</p>
    </div>`;
}

function pageCaixa() {
  const month = selectedDay.slice(0, 7);
  const jobs = db.jobs.filter((j) => j.date.startsWith(month) && j.status !== "cancelado");
  const paid = jobs.filter((j) => j.paid && j.status === "feito");
  const pending = jobs.filter((j) => !j.paid && j.status === "feito");
  const sum = (arr) => arr.reduce((a, j) => a + jobTotal(j), 0);
  return `
    <div class="card">
      <label>Mês</label>
      <input type="month" id="caixaMes" value="${month}" />
      <div class="grid" style="margin-top:12px">
        <div class="stat"><b>${fmtMoney(sum(paid))}</b><span>recebido</span></div>
        <div class="stat"><b>${fmtMoney(sum(pending))}</b><span>por cobrar</span></div>
      </div>
    </div>
    <div class="card">
      <h2>Por cobrar</h2>
      ${pending.length ? pending.map(jobItem).join("") : `<p class="empty">Nada pendente neste mês.</p>`}
    </div>
    <div class="card">
      <h2>Recebido</h2>
      ${paid.length ? paid.map(jobItem).join("") : `<p class="empty">Sem recebimentos neste mês.</p>`}
    </div>`;
}

function pageMais() {
  return `
    <div class="list">
      <button class="item" data-act="go" data-hash="precos"><div class="grow"><strong>Preços</strong><small>Tabela por tipo de veículo</small></div></button>
      <button class="item" data-act="go" data-hash="caixa"><div class="grow"><strong>Caixa</strong><small>Recebido e por cobrar</small></div></button>
      <button class="item" data-act="go" data-hash="equipa"><div class="grow"><strong>Equipa</strong><small>Quem lava</small></div></button>
      <button class="item" data-act="go" data-hash="oficina"><div class="grow"><strong>Oficina</strong><small>Nome, WhatsApp, horário, dias de aviso</small></div></button>
      <button class="item" data-act="backup"><div class="grow"><strong>Cópia de segurança</strong><small>Exportar / restaurar JSON</small></div></button>
    </div>
    <p class="muted" style="margin-top:16px">Controle de Lavagens · dados só neste aparelho.</p>`;
}

function pageEquipa() {
  return `
    <div class="card">
      <div class="row"><h2>Equipa</h2><button class="btn ghost" data-act="new-staff">+ pessoa</button></div>
      ${db.staff
        .map(
          (s) => `<div class="item">
            <div class="grow"><strong>${esc(s.name)}</strong><small>${s.active ? "Activo" : "Inactivo"}</small></div>
            <button class="btn ghost" data-act="edit-staff" data-id="${s.id}">Editar</button>
          </div>`
        )
        .join("")}
    </div>`;
}

function pageOficina() {
  const s = db.settings;
  return `
    <div class="card">
      <label>Nome da oficina</label>
      <input id="setName" value="${esc(s.businessName)}" />
      <label>WhatsApp / telefone</label>
      <input id="setWhats" value="${esc(s.whatsapp || s.phone)}" placeholder="612 000 000" />
      <label>Prefixo do país</label>
      <input id="setPrefix" value="${esc(s.prefix)}" />
      <label>Morada</label>
      <input id="setAddr" value="${esc(s.address)}" />
      <label>Abre</label>
      <input id="setOpen" type="time" value="${esc(s.openHour)}" />
      <label>Fecha</label>
      <input id="setClose" type="time" value="${esc(s.closeHour)}" />
      <label>Lembrar após (dias)</label>
      <input id="setDays" type="number" min="7" max="180" value="${esc(s.reminderDays)}" />
      <label>Moeda</label>
      <select id="setCur">
        <option value="EUR" ${s.currency === "EUR" ? "selected" : ""}>Euro</option>
        <option value="BRL" ${s.currency === "BRL" ? "selected" : ""}>Real</option>
      </select>
      <div class="actions"><button class="btn wide" data-act="save-settings">Guardar</button></div>
    </div>`;
}

function pageJob(id) {
  const job = db.jobs.find((j) => j.id === id);
  if (!job) return `<p class="empty">Marcação não encontrada.</p>`;
  const client = clientById(job.clientId);
  const vehicle = vehicleById(job.vehicleId);
  const names = (job.serviceIds || []).map((sid) => serviceById(sid)?.name).filter(Boolean);
  return `
    <div class="card">
      <div class="row"><h2>${fmtDate(job.date)} · ${esc(job.start)}</h2>${chipStatus(job.status)}</div>
      <p><strong>${esc(client?.name)}</strong><br><span class="muted">${esc(vehicleTitle(vehicle))}</span></p>
      <p>${esc(names.join(", ") || "Serviço")}</p>
      <p class="total">${fmtMoney(jobTotal(job))}</p>
      <p class="muted">${job.paid ? "Pago · " + esc(job.payMethod) : "Ainda não pago"} · ${esc(
    staffById(job.staffId)?.name || ""
  )}</p>
      ${job.notes ? `<p>${esc(job.notes)}</p>` : ""}
      <div class="actions">
        ${job.status !== "curso" && job.status !== "feito" ? `<button class="btn" data-act="status" data-id="${job.id}" data-status="curso">Começar</button>` : ""}
        ${job.status !== "feito" ? `<button class="btn" data-act="status" data-id="${job.id}" data-status="feito">Concluir</button>` : ""}
        ${!job.paid ? `<button class="btn gold" data-act="pay" data-id="${job.id}">Cobrar</button>` : ""}
        <button class="btn ghost" data-act="edit-job" data-id="${job.id}">Editar</button>
        ${
          client?.phone
            ? `<a class="btn ghost" target="_blank" rel="noopener" href="${waLink(
                client.phone,
                `Olá ${client.name}, a lavagem do ${vehicleTitle(vehicle)} ficou marcada para ${fmtDate(job.date)} às ${job.start}. ${db.settings.businessName}`
              )}">Avisar</a>`
            : ""
        }
        ${job.status !== "cancelado" && job.status !== "feito" ? `<button class="btn danger" data-act="status" data-id="${job.id}" data-status="cancelado">Cancelar</button>` : ""}
      </div>
    </div>`;
}

function optionsClients(selected) {
  return db.clients
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "pt"))
    .map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${esc(c.name)}</option>`)
    .join("");
}

function optionsVehicles(clientId, selected) {
  return vehiclesOf(clientId)
    .map((v) => `<option value="${v.id}" ${v.id === selected ? "selected" : ""}>${esc(vehicleTitle(v))}</option>`)
    .join("");
}

function serviceChecks(vehicleId, selectedIds) {
  const vehicle = vehicleById(vehicleId);
  const size = vehicle?.size || "berlina";
  const selected = new Set(selectedIds || []);
  return db.services
    .filter((s) => s.active !== false)
    .map((s) => {
      const p = priceOf(s, size);
      return `<label class="check">
        <input type="checkbox" data-svc="${s.id}" ${selected.has(s.id) ? "checked" : ""} ${p ? "" : ""} />
        <span class="grow">${esc(s.name)}<br><small>${s.durationMin} min · ${fmtMoney(p)}</small></span>
      </label>`;
    })
    .join("");
}

function jobForm(job, preset = {}) {
  const clientId = job?.clientId || preset.clientId || db.clients[0]?.id || "";
  const vehicleId = job?.vehicleId || preset.vehicleId || vehiclesOf(clientId)[0]?.id || "";
  const date = job?.date || preset.date || selectedDay || today();
  const start = job?.start || "10:00";
  const status = job?.status || "confirmado";
  const staffId = job?.staffId || db.staff.find((s) => s.active)?.id || "";
  const serviceIds = job?.serviceIds || [];
  const discount = job?.discount || 0;
  return `
    <div class="sheet">
      <h2>${job ? "Editar marcação" : "Nova marcação"}</h2>
      <label>Cliente</label>
      <select id="fClient">${optionsClients(clientId)}</select>
      <button class="btn ghost" type="button" data-act="new-client" style="margin-top:6px">Novo cliente</button>
      <label>Veículo</label>
      <select id="fVehicle">${optionsVehicles(clientId, vehicleId)}</select>
      <button class="btn ghost" type="button" data-act="new-vehicle" data-client="${clientId}" style="margin-top:6px">Novo veículo</button>
      <label>Dia</label>
      <input id="fDate" type="date" value="${esc(date)}" />
      <label>Hora</label>
      <input id="fStart" type="time" value="${esc(start)}" />
      <label>Quem lava</label>
      <select id="fStaff">${db.staff
        .map((s) => `<option value="${s.id}" ${s.id === staffId ? "selected" : ""}>${esc(s.name)}</option>`)
        .join("")}</select>
      <label>Estado</label>
      <select id="fStatus">${Object.entries(STATUS)
        .map(([k, v]) => `<option value="${k}" ${k === status ? "selected" : ""}>${v.label}</option>`)
        .join("")}</select>
      <div id="svcBox">${serviceChecks(vehicleId, serviceIds)}</div>
      <label>Desconto</label>
      <input id="fDisc" type="number" min="0" step="0.5" value="${esc(discount)}" />
      <label>Notas</label>
      <textarea id="fNotes">${esc(job?.notes || "")}</textarea>
      <p class="total" id="fTotal">${fmtMoney(job ? jobTotal(job) : 0)}</p>
      <div class="actions">
        <button class="btn wide" data-act="save-job" data-id="${job?.id || ""}">Guardar</button>
        <button class="btn ghost wide" data-act="close">Fechar</button>
      </div>
    </div>`;
}

function clientForm(client) {
  return `
    <div class="sheet">
      <h2>${client ? "Editar cliente" : "Novo cliente"}</h2>
      <label>Nome</label><input id="cName" value="${esc(client?.name || "")}" />
      <label>Telefone / WhatsApp</label><input id="cPhone" value="${esc(client?.phone || "")}" inputmode="tel" />
      <label>E-mail</label><input id="cEmail" value="${esc(client?.email || "")}" />
      <label>Notas</label><textarea id="cNotes">${esc(client?.notes || "")}</textarea>
      <div class="actions">
        <button class="btn wide" data-act="save-client" data-id="${client?.id || ""}">Guardar</button>
        ${client ? `<button class="btn danger wide" data-act="del-client" data-id="${client.id}">Apagar cliente</button>` : ""}
        <button class="btn ghost wide" data-act="close">Fechar</button>
      </div>
    </div>`;
}

function vehicleForm(vehicle, clientId) {
  const cid = vehicle?.clientId || clientId;
  return `
    <div class="sheet">
      <h2>${vehicle ? "Editar veículo" : "Novo veículo"}</h2>
      <label>Matrícula</label><input id="vPlate" value="${esc(vehicle?.plate || "")}" />
      <label>Marca</label><input id="vBrand" value="${esc(vehicle?.brand || "")}" />
      <label>Modelo</label><input id="vModel" value="${esc(vehicle?.model || "")}" />
      <label>Cor</label><input id="vColor" value="${esc(vehicle?.color || "")}" />
      <label>Tipo</label>
      <select id="vSize">${SIZES.map(
        (s) => `<option value="${s.id}" ${s.id === (vehicle?.size || "berlina") ? "selected" : ""}>${s.label}</option>`
      ).join("")}</select>
      <label>Notas</label><textarea id="vNotes">${esc(vehicle?.notes || "")}</textarea>
      <div class="actions">
        <button class="btn wide" data-act="save-vehicle" data-id="${vehicle?.id || ""}" data-client="${cid}">Guardar</button>
        ${vehicle ? `<button class="btn danger wide" data-act="del-vehicle" data-id="${vehicle.id}">Apagar veículo</button>` : ""}
        <button class="btn ghost wide" data-act="close">Fechar</button>
      </div>
    </div>`;
}

function openModal(html) {
  modal.innerHTML = html;
  if (!modal.open) modal.showModal();
  bindLiveTotal();
}

function closeModal() {
  if (modal.open) modal.close();
  modal.innerHTML = "";
}

function selectedServiceIds() {
  return [...modal.querySelectorAll("[data-svc]:checked")].map((el) => el.getAttribute("data-svc"));
}

function liveTotal() {
  const totalEl = $("fTotal");
  if (!totalEl) return;
  const vehicle = vehicleById($("fVehicle")?.value);
  const size = vehicle?.size || "berlina";
  const sum = selectedServiceIds().reduce((a, id) => a + priceOf(serviceById(id), size), 0);
  const disc = Number($("fDisc")?.value || 0);
  totalEl.textContent = fmtMoney(Math.max(0, sum - disc));
}

function bindLiveTotal() {
  modal.querySelectorAll("[data-svc], #fDisc, #fVehicle").forEach((el) => {
    el.addEventListener("change", () => {
      if (el.id === "fVehicle" || el.id === "fClient") refreshJobServices();
      liveTotal();
    });
  });
}

function refreshJobServices() {
  const box = $("svcBox");
  if (!box) return;
  const keep = selectedServiceIds();
  box.innerHTML = serviceChecks($("fVehicle")?.value, keep);
  bindLiveTotal();
  liveTotal();
}

function addMinutes(time, minutes) {
  const [h, m] = String(time || "10:00").split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m + Number(minutes || 30));
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function collectJob(id) {
  const serviceIds = selectedServiceIds();
  const duration = serviceIds.reduce((a, sid) => a + Number(serviceById(sid)?.durationMin || 30), 0) || Number(db.settings.slotMin || 30);
  const start = $("fStart").value;
  return {
    id: id || uid(),
    clientId: $("fClient").value,
    vehicleId: $("fVehicle").value,
    staffId: $("fStaff").value,
    date: $("fDate").value,
    start,
    end: addMinutes(start, duration),
    serviceIds,
    status: $("fStatus").value,
    discount: Number($("fDisc").value || 0),
    paid: id ? db.jobs.find((j) => j.id === id)?.paid || false : false,
    payMethod: id ? db.jobs.find((j) => j.id === id)?.payMethod || "Pendente" : "Pendente",
    notes: $("fNotes").value.trim(),
  };
}

function titles() {
  return {
    hoje: "Hoje",
    agenda: "Agenda",
    clientes: "Clientes",
    lembretes: "Lembretes",
    mais: "Mais",
    precos: "Preços",
    caixa: "Caixa",
    equipa: "Equipa",
    oficina: "Oficina",
    cliente: "Cliente",
    job: "Marcação",
  };
}

function render() {
  db = load();
  $("brandName").textContent = db.settings.businessName || "Controle de Lavagens";
  const { page, id } = hashParts();
  document.querySelectorAll(".tabs a").forEach((a) => {
    a.classList.toggle("active", a.dataset.tab === page);
  });
  const map = titles();
  $("pageTitle").textContent = map[page] || "Controle de Lavagens";
  $("btnAdd").style.display = db.settings.welcome ? "none" : "inline-flex";

  if (db.settings.welcome) {
    view.innerHTML = pageWelcome();
    return;
  }
  if (page === "hoje") view.innerHTML = pageHoje();
  else if (page === "agenda") view.innerHTML = pageAgenda();
  else if (page === "clientes") view.innerHTML = pageClientes();
  else if (page === "cliente") view.innerHTML = pageCliente(id);
  else if (page === "lembretes") view.innerHTML = pageLembretes();
  else if (page === "precos") view.innerHTML = pagePreços();
  else if (page === "caixa") view.innerHTML = pageCaixa();
  else if (page === "mais") view.innerHTML = pageMais();
  else if (page === "equipa") view.innerHTML = pageEquipa();
  else if (page === "oficina") view.innerHTML = pageOficina();
  else if (page === "job") view.innerHTML = pageJob(id);
  else view.innerHTML = pageHoje();

  const q = $("qClient");
  if (q) {
    q.addEventListener("input", () => {
      clientQuery = q.value;
      render();
      const again = $("qClient");
      if (again) {
        again.focus();
        again.setSelectionRange(clientQuery.length, clientQuery.length);
      }
    });
  }
  const mes = $("caixaMes");
  if (mes) {
    mes.addEventListener("change", () => {
      selectedDay = mes.value + "-01";
      render();
    });
  }
  document.querySelectorAll("[data-price]").forEach((input) => {
    input.addEventListener("change", () => {
      const svc = serviceById(input.dataset.price);
      if (!svc) return;
      svc.prices[input.dataset.size] = Number(input.value || 0);
      save();
    });
  });
  document.querySelectorAll("[data-price-name]").forEach((input) => {
    input.addEventListener("change", () => {
      const svc = serviceById(input.dataset.priceName);
      if (!svc) return;
      svc.name = input.value.trim() || svc.name;
      save();
    });
  });
}

function backupExport() {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `controle-lavagens-${today()}.json`;
  a.click();
}

function backupImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || !Array.isArray(data.clients)) throw new Error("ficheiro inválido");
      db = { ...emptyDb(), ...data, settings: { ...emptyDb().settings, ...(data.settings || {}), welcome: false } };
      save();
      render();
    } catch (err) {
      alert("Não deu para restaurar: " + err.message);
    }
  };
  input.click();
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-act]");
  if (!btn) return;
  const act = btn.dataset.act;
  const id = btn.dataset.id;

  if (act === "start-empty") startEmpty();
  if (act === "seed") {
    seedExample();
    go("hoje");
    render();
  }
  if (act === "nova") {
    if (!db.clients.length) {
      openModal(clientForm(null));
      return;
    }
    openModal(jobForm(null, { date: btn.dataset.date || selectedDay, clientId: btn.dataset.client, vehicleId: btn.dataset.vehicle }));
    liveTotal();
  }
  if (act === "open-job") go("job/" + id);
  if (act === "open-client") go("cliente/" + id);
  if (act === "go") go(btn.dataset.hash);
  if (act === "month") {
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + Number(btn.dataset.dir), 1);
    render();
  }
  if (act === "day") {
    selectedDay = btn.dataset.date;
    render();
  }
  if (act === "new-client") openModal(clientForm(null));
  if (act === "edit-client") openModal(clientForm(clientById(id)));
  if (act === "save-client") {
    const name = $("cName").value.trim();
    if (!name) return alert("Ponha o nome.");
    if (id) {
      const c = clientById(id);
      Object.assign(c, { name, phone: $("cPhone").value.trim(), email: $("cEmail").value.trim(), notes: $("cNotes").value.trim() });
    } else {
      db.clients.push({
        id: uid(),
        name,
        phone: $("cPhone").value.trim(),
        email: $("cEmail").value.trim(),
        notes: $("cNotes").value.trim(),
        createdAt: today(),
      });
    }
    save();
    closeModal();
    render();
  }
  if (act === "del-client") {
    if (!confirm("Apagar este cliente e os veículos?")) return;
    db.vehicles = db.vehicles.filter((v) => v.clientId !== id);
    db.clients = db.clients.filter((c) => c.id !== id);
    save();
    closeModal();
    go("clientes");
    render();
  }
  if (act === "new-vehicle") openModal(vehicleForm(null, btn.dataset.client || $("fClient")?.value));
  if (act === "edit-vehicle") openModal(vehicleForm(vehicleById(id)));
  if (act === "save-vehicle") {
    const plate = $("vPlate").value.trim().toUpperCase();
    const payload = {
      clientId: btn.dataset.client,
      plate,
      brand: $("vBrand").value.trim(),
      model: $("vModel").value.trim(),
      color: $("vColor").value.trim(),
      size: $("vSize").value,
      notes: $("vNotes").value.trim(),
    };
    if (id) Object.assign(vehicleById(id), payload);
    else db.vehicles.push({ id: uid(), ...payload });
    save();
    closeModal();
    render();
  }
  if (act === "del-vehicle") {
    if (!confirm("Apagar este veículo?")) return;
    db.vehicles = db.vehicles.filter((v) => v.id !== id);
    save();
    closeModal();
    render();
  }
  if (act === "save-job") {
    const job = collectJob(id);
    if (!job.clientId) return alert("Falta o cliente.");
    if (!job.vehicleId) return alert("Falta o veículo.");
    if (!job.serviceIds.length) return alert("Escolha pelo menos um serviço.");
    if (conflict(job) && !confirm("Há outro serviço à mesma hora. Guardar mesmo assim?")) return;
    const i = db.jobs.findIndex((j) => j.id === job.id);
    if (i >= 0) db.jobs[i] = { ...db.jobs[i], ...job };
    else db.jobs.push(job);
    save();
    closeModal();
    go("job/" + job.id);
    render();
  }
  if (act === "edit-job") openModal(jobForm(db.jobs.find((j) => j.id === id)));
  if (act === "status") {
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return;
    job.status = btn.dataset.status;
    if (job.status === "feito") {
      const v = vehicleById(job.vehicleId);
      if (v) v.lastServiceAt = job.date;
    }
    save();
    render();
  }
  if (act === "pay") {
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return;
    const method = prompt("Como pagou?", job.payMethod === "Pendente" ? "Numerário" : job.payMethod);
    if (!method) return;
    job.paid = true;
    job.payMethod = method;
    job.status = "feito";
    save();
    render();
  }
  if (act === "close") closeModal();
  if (act === "new-service") {
    db.services.push({
      id: uid(),
      name: "Novo serviço",
      category: "extra",
      durationMin: 30,
      active: true,
      prices: { citadino: 0, berlina: 0, suv: 0, van: 0, moto: 0 },
    });
    save();
    render();
  }
  if (act === "del-service") {
    db.services = db.services.filter((s) => s.id !== id);
    save();
    render();
  }
  if (act === "new-staff") {
    const name = prompt("Nome");
    if (!name) return;
    db.staff.push({ id: uid(), name: name.trim(), active: true });
    save();
    render();
  }
  if (act === "edit-staff") {
    const s = staffById(id);
    const name = prompt("Nome", s.name);
    if (!name) return;
    s.name = name.trim();
    save();
    render();
  }
  if (act === "save-settings") {
    db.settings.businessName = $("setName").value.trim() || "Controle de Lavagens";
    db.settings.whatsapp = $("setWhats").value.trim();
    db.settings.phone = db.settings.whatsapp;
    db.settings.prefix = $("setPrefix").value.trim() || "34";
    db.settings.address = $("setAddr").value.trim();
    db.settings.openHour = $("setOpen").value;
    db.settings.closeHour = $("setClose").value;
    db.settings.reminderDays = Number($("setDays").value || 30);
    db.settings.currency = $("setCur").value;
    save();
    render();
  }
  if (act === "backup") {
    openModal(`
      <div class="sheet">
        <h2>Cópia de segurança</h2>
        <p class="muted">Guarde o ficheiro no telemóvel ou envie a si mesmo por WhatsApp.</p>
        <div class="actions">
          <button class="btn wide" data-act="export">Exportar</button>
          <button class="btn ghost wide" data-act="import">Restaurar</button>
          <button class="btn ghost wide" data-act="close">Fechar</button>
        </div>
      </div>`);
  }
  if (act === "export") backupExport();
  if (act === "import") backupImport();
});

$("btnAdd").addEventListener("click", () => {
  if (db.settings.welcome) return;
  if (!db.clients.length) openModal(clientForm(null));
  else openModal(jobForm(null, { date: selectedDay }));
});

modal.addEventListener("click", (event) => {
  if (event.target.id === "fClient") return;
});
document.addEventListener("change", (event) => {
  if (event.target.id === "fClient") {
    const box = $("fVehicle");
    if (!box) return;
    box.innerHTML = optionsVehicles(event.target.value, "");
    refreshJobServices();
  }
});

window.addEventListener("hashchange", render);
render();

if (location.protocol.startsWith("http") && "serviceWorker" in navigator) {
  const link = document.createElement("link");
  link.rel = "manifest";
  link.href = "manifest.json";
  document.head.appendChild(link);
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
